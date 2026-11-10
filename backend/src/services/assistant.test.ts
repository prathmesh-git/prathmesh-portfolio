import test from 'node:test';
import assert from 'node:assert/strict';
import { answerFromVerifiedFacts } from './assistant.js';

/* ------------------------------------------------------------------ */
/*  Project-specific questions                                         */
/* ------------------------------------------------------------------ */

test('answers cloud / AWS questions from verified project facts', () => {
  assert.match(answerFromVerifiedFacts('Tell me about AWS'), /event-driven AWS pipeline/);
});

test('answers Linux questions from verified résumé facts', () => {
  assert.match(answerFromVerifiedFacts('What Linux skills?'), /Bash toolkit for RHEL/);
});

test('answers Docker questions', () => {
  assert.match(answerFromVerifiedFacts('Does he know Docker?'), /Unreel project stack/);
});

test('answers Unreel questions', () => {
  assert.match(answerFromVerifiedFacts('What is Unreel?'), /fact-checking application/);
});

/* ------------------------------------------------------------------ */
/*  Profile & education questions                                      */
/* ------------------------------------------------------------------ */

test('answers education questions', () => {
  assert.match(answerFromVerifiedFacts('Where did he study?'), /GH Raisoni University/);
});

test('answers internship experience questions', () => {
  assert.match(answerFromVerifiedFacts('Tell me about his internship'), /Digital Guruji/);
});

test('answers availability questions', () => {
  assert.match(answerFromVerifiedFacts('Is he looking for a job?'), /actively looking/);
});

/* ------------------------------------------------------------------ */
/*  New coverage: greetings, skills, contact, resume, certifications   */
/* ------------------------------------------------------------------ */

test('responds to greetings', () => {
  assert.match(answerFromVerifiedFacts('Hello!'), /portfolio assistant/);
});

test('responds to "who is" queries', () => {
  assert.match(answerFromVerifiedFacts('Who is Prathmesh?'), /Cloud & DevOps Engineer/);
});

test('answers skills / tech stack questions', () => {
  assert.match(answerFromVerifiedFacts('What is his tech stack?'), /React/);
});

test('answers contact questions', () => {
  assert.match(answerFromVerifiedFacts('How can I contact him?'), /prathmeshimpalshende@gmail.com/);
});

test('answers resume questions', () => {
  assert.match(answerFromVerifiedFacts('Can I download his resume?'), /résumé/i);
});

test('answers certification / training questions', () => {
  assert.match(answerFromVerifiedFacts('Any certifications?'), /Apna College/);
});

test('answers general project overview', () => {
  assert.match(answerFromVerifiedFacts('Show me his projects'), /CloudDataFlow/);
});

/* ------------------------------------------------------------------ */
/*  Safety: does not invent details                                    */
/* ------------------------------------------------------------------ */

test('does not invent details outside the knowledge base', () => {
  assert.match(
    answerFromVerifiedFacts('How many production customers?'),
    /projects|skills|education|experience/,
  );
});

test('provides contact info in default fallback', () => {
  assert.match(
    answerFromVerifiedFacts('What is the meaning of life?'),
    /prathmeshimpalshende@gmail.com/,
  );
});
