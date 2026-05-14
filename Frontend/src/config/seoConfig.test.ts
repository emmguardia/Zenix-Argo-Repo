import { describe, it, expect } from 'vitest';
import { seoConfig } from './seoConfig';

describe('seoConfig', () => {
  it('expose home title et description', () => {
    expect(seoConfig.home).toBeDefined();
    expect(typeof seoConfig.home.title).toBe('string');
    expect(seoConfig.home.title.length).toBeGreaterThan(0);
    expect(typeof seoConfig.home.description).toBe('string');
  });

  it('expose contact config', () => {
    expect(seoConfig.contact).toBeDefined();
    expect(typeof seoConfig.contact.title).toBe('string');
  });
});
