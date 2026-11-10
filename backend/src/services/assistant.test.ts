import test from 'node:test';
import assert from 'node:assert/strict';
import { answerFromVerifiedFacts } from './assistant.js';

test('answers cloud questions from verified project facts', () => {
  assert.match(answerFromVerifiedFacts('Tell me about AWS'), /event-driven AWS pipeline/);
});
test('answers Linux questions from verified résumé facts', () => {
  assert.match(answerFromVerifiedFacts('What Linux skills?'), /Bash toolkit for RHEL/);
});
test('does not invent details outside the knowledge base', () => {
  assert.match(
    answerFromVerifiedFacts('How many production customers?'),
    /verified portfolio details/,
  );
});
