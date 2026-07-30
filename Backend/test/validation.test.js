import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  isValidEmail,
  getProjectLabel,
  getTimelineLabel,
  projectLabels,
  timelineLabels,
  createRateLimiter,
  isHoneypotTriggered,
  getClientIp
} from '../lib/validation.js';

describe('validation', () => {
  describe('isValidEmail', () => {
    it('accepte un email valide', () => {
      assert.strictEqual(isValidEmail('user@example.com'), true);
      assert.strictEqual(isValidEmail('a+b@domain.fr'), true);
    });
    it('refuse email invalide', () => {
      assert.strictEqual(isValidEmail(''), false);
      assert.strictEqual(isValidEmail('no-at'), false);
      assert.strictEqual(isValidEmail('@nodomain.com'), false);
      assert.strictEqual(isValidEmail(null), false);
    });
  });

  describe('getProjectLabel', () => {
    it('retourne le libellé pour une clé connue', () => {
      assert.ok(getProjectLabel('site-vitrine').includes('Vitrine'));
      assert.strictEqual(getProjectLabel('autre'), 'Autre projet');
    });
    it('retourne la clé si inconnue', () => {
      assert.strictEqual(getProjectLabel('unknown'), 'unknown');
    });
  });

  describe('getTimelineLabel', () => {
    it('retourne le libellé pour une clé connue', () => {
      assert.ok(getTimelineLabel('urgent').includes('Rapide'));
    });
    it('retourne la clé si inconnue', () => {
      assert.strictEqual(getTimelineLabel('unknown'), 'unknown');
    });
  });

  describe('constants', () => {
    it('projectLabels et timelineLabels sont non vides', () => {
      assert.ok(Object.keys(projectLabels).length >= 1);
      assert.ok(Object.keys(timelineLabels).length >= 1);
    });
  });

  describe('getClientIp', () => {
    it('utilise CF-Connecting-IP quand Cloudflare le fournit', () => {
      const req = {
        headers: { 'cf-connecting-ip': '203.0.113.7' },
        socket: { remoteAddress: '10.42.0.1' }
      };
      assert.strictEqual(getClientIp(req), '203.0.113.7');
    });

    it('ignore un X-Forwarded-For forgé par le client', () => {
      // Le scénario que cette fonction existe pour empêcher : sans elle, un
      // X-Forwarded-For envoyé par l'attaquant devenait la clé du compteur,
      // et il lui suffisait de la faire varier pour émettre sans limite.
      const req = {
        headers: { 'x-forwarded-for': '1.2.3.4, 10.42.0.1' },
        socket: { remoteAddress: '10.42.0.1' }
      };
      assert.strictEqual(getClientIp(req), '10.42.0.1');
    });

    it('retombe sur l\'adresse de la socket sans en-tête Cloudflare', () => {
      const req = { headers: {}, socket: { remoteAddress: '10.42.0.9' } };
      assert.strictEqual(getClientIp(req), '10.42.0.9');
    });

    it('ne renvoie jamais une valeur vide', () => {
      assert.strictEqual(getClientIp({ headers: { 'cf-connecting-ip': '   ' }, socket: {} }), 'inconnue');
      assert.strictEqual(getClientIp({}), 'inconnue');
    });
  });

  describe('isHoneypotTriggered', () => {
    it('ne se déclenche pas pour un champ vide ou absent', () => {
      assert.strictEqual(isHoneypotTriggered(''), false);
      assert.strictEqual(isHoneypotTriggered('   '), false);
      assert.strictEqual(isHoneypotTriggered(undefined), false);
      assert.strictEqual(isHoneypotTriggered(null), false);
    });
    it('se déclenche dès que le champ est rempli', () => {
      assert.strictEqual(isHoneypotTriggered('http://spam.example'), true);
      assert.strictEqual(isHoneypotTriggered('x'), true);
    });
  });

  describe('createRateLimiter', () => {
    it('autorise jusqu\'à la limite puis refuse', () => {
      const allowed = createRateLimiter({ windowMs: 1000, max: 3 });
      assert.strictEqual(allowed('1.2.3.4'), true);
      assert.strictEqual(allowed('1.2.3.4'), true);
      assert.strictEqual(allowed('1.2.3.4'), true);
      assert.strictEqual(allowed('1.2.3.4'), false);
    });

    it('compte séparément chaque IP', () => {
      const allowed = createRateLimiter({ windowMs: 1000, max: 1 });
      assert.strictEqual(allowed('1.1.1.1'), true);
      assert.strictEqual(allowed('1.1.1.1'), false);
      assert.strictEqual(allowed('2.2.2.2'), true);
    });

    it('réautorise une fois la fenêtre écoulée', () => {
      let clock = 0;
      const allowed = createRateLimiter({ windowMs: 1000, max: 1, now: () => clock });
      assert.strictEqual(allowed('1.2.3.4'), true);
      assert.strictEqual(allowed('1.2.3.4'), false);
      clock += 1001;
      assert.strictEqual(allowed('1.2.3.4'), true);
    });

    it('purge les entrées expirées au lieu de fuir en mémoire', () => {
      let clock = 0;
      const allowed = createRateLimiter({ windowMs: 100, max: 1, now: () => clock });
      for (let i = 0; i < 50; i++) {
        allowed(`ip-${i}`);
        clock += 10;
      }
      // Après avoir largement dépassé la fenêtre, les anciennes IP doivent
      // avoir été oubliées : chacune est de nouveau autorisée.
      clock += 1000;
      assert.strictEqual(allowed('ip-0'), true);
    });
  });
});
