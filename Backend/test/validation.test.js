import { describe, it } from 'node:test';
import assert from 'node:assert';
import { isValidEmail, getProjectLabel, getTimelineLabel, projectLabels, timelineLabels } from '../lib/validation.js';

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
});
