import { describe, expect, it } from 'vitest';
import { evaluateCommand } from './commands';

describe('safe terminal command registry', () => {
  it('returns a sample for a supported command', () => {
    expect(evaluateCommand('df -h').output).toContain('Filesystem');
  });
  it('rejects commands that are not explicitly registered without executing them', () => {
    const result = evaluateCommand('rm -rf /');
    expect(result.error).toBe(true);
    expect(result.output).toContain('not in this safe demo');
  });
  it('normalizes harmless whitespace before looking up commands', () => {
    expect(evaluateCommand('  systemctl   status nginx ').output).toContain('active (running)');
  });
  it('returns help without shell execution', () => {
    expect(evaluateCommand('help').output).toContain('docker ps');
  });
});
