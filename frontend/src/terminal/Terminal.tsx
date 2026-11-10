import { FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { commandNames, evaluateCommand } from './commands';
import { scriptExamples } from './scripts';

type Entry = { command: string; output: string; error?: boolean; explanation: string };
const suggestions = [
  'uname -a',
  'df -h',
  'free -h',
  'systemctl status nginx',
  'ip addr',
  'docker ps',
];

export function Terminal() {
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState<Entry[]>([
    { command: 'whoami', ...evaluateCommand('whoami') },
  ]);
  const [explanation, setExplanation] = useState(evaluateCommand('whoami').explanation);
  const [activeScript, setActiveScript] = useState(scriptExamples[0]);
  const historyIndex = useRef(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = (raw: string) => {
    const command = raw.trim().replace(/\s+/g, ' ');
    if (!command) return;
    if (command === 'clear') {
      setEntries([]);
      setExplanation('Screen cleared. This simulated terminal still cannot run shell commands.');
      return;
    }
    const result =
      command === 'history'
        ? {
            ...evaluateCommand(command),
            output:
              entries.map((entry, index) => `${index + 1}  ${entry.command}`).join('\n') ||
              'No commands in this session.',
          }
        : evaluateCommand(command);
    setEntries((current) => [...current, { command, ...result }].slice(-12));
    setExplanation(result.explanation);
    historyIndex.current = -1;
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    run(input);
    setInput('');
  };
  const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const match = commandNames.find((command) => command.startsWith(input.trim()));
      if (match) setInput(match);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const next = Math.min(entries.length - 1, historyIndex.current + 1);
      historyIndex.current = next;
      if (entries[next]) setInput(entries[entries.length - next - 1].command);
    } else if (event.key === 'ArrowDown' && historyIndex.current >= 0) {
      event.preventDefault();
      historyIndex.current -= 1;
      setInput(
        historyIndex.current >= 0
          ? (entries[entries.length - historyIndex.current - 1]?.command ?? '')
          : '',
      );
    }
  };

  return (
    <section className="terminal-section section-pad" id="terminal">
      <div className="shell">
        <Reveal>
          <div className="section-kicker">
            <span>05</span>
            <span>INSIDE MY TERMINAL</span>
            <span className="kicker-note">SIMULATED · SAFE TO EXPLORE</span>
          </div>
          <div className="section-heading">
            <h2>
              Step into the shell.
              <br />
              <em>Try a command.</em>
            </h2>
            <p>
              Click a command below or type one at the prompt. Try <code>help</code>,{' '}
              <code>df -h</code>, or <code>docker ps</code>. It’s a safe simulation; nothing runs on
              a server.
            </p>
          </div>
          <div className="terminal-shell">
            <div className="terminal-title">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>prathmesh@portfolio : ~</span>
              <span>bash — simulated</span>
            </div>
            <div className="terminal-screen">
              <div className="terminal-history" aria-live="polite">
                <div className="term-line term-muted">
                  Welcome. Choose a command or type one from the list below.
                </div>
                {entries.map((entry, index) => (
                  <div key={`${entry.command}-${index}`}>
                    <div className="term-line">
                      <span className="term-user">prathmesh@portfolio</span>:
                      <span className="term-path">~</span>$ {entry.command}
                    </div>
                    <pre className={`term-output${entry.error ? ' error' : ''}`}>
                      {entry.output}
                    </pre>
                  </div>
                ))}
                <div className="term-line term-muted">{explanation}</div>
              </div>
              <form className="terminal-form" onSubmit={submit}>
                <label htmlFor="terminal-input" className="term-prompt">
                  prathmesh@portfolio:~$
                </label>
                <input
                  ref={inputRef}
                  id="terminal-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={keyDown}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Enter a safe simulated Linux command"
                  placeholder="try: df -h"
                />
                <button type="submit" aria-label="Run simulated command">
                  ↵
                </button>
              </form>
            </div>
            <div className="command-suggestions">
              <span>TRY ONE</span>
              {suggestions.map((command) => (
                <button
                  key={command}
                  type="button"
                  onClick={() => {
                    run(command);
                    setInput('');
                    inputRef.current?.focus();
                  }}
                >
                  {command}
                </button>
              ))}
              <button type="button" onClick={() => run('help')}>
                help
              </button>
              <button type="button" onClick={() => run('clear')}>
                clear
              </button>
            </div>
            <div className="terminal-explain">
              <span>WHY THIS COMMAND</span>
              <p>{explanation}</p>
            </div>
          </div>
          <div className="script-example">
            <div className="script-menu">
              <span className="script-label">BASH / PRACTICAL EXAMPLES</span>
              <p>{activeScript.description}</p>
              <div className="script-choices" role="group" aria-label="Bash script examples">
                {scriptExamples.map((script) => (
                  <button
                    key={script.id}
                    type="button"
                    aria-pressed={activeScript.id === script.id}
                    onClick={() => setActiveScript(script)}
                  >
                    {script.title}
                  </button>
                ))}
              </div>
            </div>
            <pre aria-label={`${activeScript.filename} sample`}>
              <code>{`# ${activeScript.filename}\n${activeScript.code}`}</code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
