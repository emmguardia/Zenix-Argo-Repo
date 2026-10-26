import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'crypto';
import { notifierCerveau, signerCerveau } from '../lib/cerveau.js';

test('la signature couvre le timestamp et le corps', () => {
  const attendu = 'sha256=' + createHmac('sha256', 's').update('123.{"a":1}').digest('hex');
  assert.equal(signerCerveau('s', '123', '{"a":1}'), attendu);
  assert.notEqual(signerCerveau('s', '124', '{"a":1}'), attendu);
});

test('envoie une requête signée, et ne fait rien sans configuration', async () => {
  let recu;
  const faux = async (url, opts) => { recu = { url, opts }; return { ok: true, status: 200 }; };
  assert.equal(await notifierCerveau('', 's', {}, faux), false);
  assert.equal(await notifierCerveau('https://c/api/hooks/contact', 's', { from_name: 'Lucas' }, faux), true);
  const h = recu.opts.headers;
  assert.equal(h['X-Cerveau-Signature'], signerCerveau('s', h['X-Cerveau-Timestamp'], recu.opts.body));
  assert.equal(JSON.parse(recu.opts.body).from_name, 'Lucas');
});

test('une erreur HTTP remonte (le serveur la journalise sans bloquer le formulaire)', async () => {
  await assert.rejects(notifierCerveau('https://c', 's', {}, async () => ({ ok: false, status: 401 })), /HTTP 401/);
});
