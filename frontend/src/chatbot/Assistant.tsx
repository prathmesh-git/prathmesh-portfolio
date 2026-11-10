import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowUp, X, Sparkles, MessageCircle } from 'lucide-react';

type Message = { role: 'assistant' | 'user'; text: string; timestamp: number };

/* ------------------------------------------------------------------ */
/*  Suggestion prompts — rotated after each exchange                   */
/* ------------------------------------------------------------------ */

const allPrompts = [
  ['AWS experience', 'Linux skills', 'Tell me about Unreel'],
  ['Tech stack', 'Work experience', 'Is he available?'],
  ['Education', 'Docker knowledge', 'Contact info'],
  ['Certifications', 'All projects', 'Resume'],
];

/* ------------------------------------------------------------------ */
/*  Loading indicator messages — randomized                            */
/* ------------------------------------------------------------------ */

const thinkingMessages = [
  'Checking the portfolio…',
  'Looking that up…',
  'Finding the answer…',
  'Searching the portfolio…',
];

function randomThinking() {
  return thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MAX_MESSAGES = 50;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'DEMO MODE' | 'AI MODE'>('DEMO MODE');
  const [question, setQuestion] = useState('');
  const [promptSet, setPromptSet] = useState(0);
  const [thinkingText, setThinkingText] = useState(thinkingMessages[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hey! I'm Prathmesh's portfolio assistant. Ask me about his projects, skills, experience, or anything else you'd like to know!",
      timestamp: Date.now(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  const ask = async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: 'user', text, timestamp: Date.now() };
    setMessages((current) => [...current, userMessage].slice(-MAX_MESSAGES));
    setQuestion('');
    setLoading(true);
    setThinkingText(randomThinking());

    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

      // Build conversation history from existing messages (skip the greeting)
      const historyForApi = messages
        .slice(1) // skip the initial greeting
        .slice(-12) // last 12 messages = 6 pairs max
        .map((m) => ({ role: m.role, content: m.text }));

      const response = await fetch(`${apiBase}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, history: historyForApi }),
      });

      if (!response.ok) throw new Error('Assistant is unavailable');
      const payload: { answer: string; mode: 'demo' | 'ai' } = await response.json();

      setMode(payload.mode === 'ai' ? 'AI MODE' : 'DEMO MODE');
      setMessages((current) =>
        [...current, { role: 'assistant' as const, text: payload.answer, timestamp: Date.now() }].slice(-MAX_MESSAGES),
      );
    } catch {
      setMode('DEMO MODE');
      setMessages((current) =>
        [
          ...current,
          {
            role: 'assistant' as const,
            text: "I'm currently offline. You can still ask me about Prathmesh's projects, skills, or experience — or reach him directly at prathmeshimpalshende@gmail.com.",
            timestamp: Date.now(),
          },
        ].slice(-MAX_MESSAGES),
      );
    } finally {
      setLoading(false);
      // Rotate suggestions
      setPromptSet((current) => (current + 1) % allPrompts.length);
      // Re-focus input
      inputRef.current?.focus();
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void ask(question);
  };

  const currentPrompts = allPrompts[promptSet];

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* ── Floating launcher ── */}
      <button
        className="ask-launcher"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="ask-launcher-glow" aria-hidden="true" />
        <img className="chatbot-orb" src="/images/chatbot-orb.webp" alt="" aria-hidden="true" />
        <span className="ask-launcher-label">Ask Prathmesh</span>
      </button>

      {/* ── Chat panel ── */}
      {open && (
        <aside className="ask-panel" aria-label="Ask Prathmesh portfolio assistant">
          {/* Header */}
          <div className="ask-head">
            <div className="ask-head-left">
              <span className="ask-avatar">
                <img className="chatbot-orb" src="/images/chatbot-orb.webp" alt="" />
              </span>
              <span className="ask-head-info">
                <b>Ask Prathmesh</b>
                <small>
                  <Sparkles size={9} />
                  Portfolio guide · {mode.toLowerCase()}
                </small>
              </span>
            </div>
            <button className="ask-close" onClick={() => setOpen(false)} aria-label="Close assistant">
              <X size={16} />
            </button>
          </div>

          {/* Mode badge */}
          <div className="ask-demo-note">
            <MessageCircle size={10} />
            <span>{mode} · ANSWERS USE VERIFIED PORTFOLIO DETAILS</span>
          </div>

          {/* Messages */}
          <div className="ask-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`ask-bubble ${message.role === 'user' ? 'ask-user' : 'ask-reply'}`}
              >
                {message.role === 'assistant' && (
                  <span className="ask-bubble-avatar">
                    <img className="chatbot-orb" src="/images/chatbot-orb.webp" alt="" />
                  </span>
                )}
                <div className="ask-bubble-content">
                  <p>{message.text}</p>
                  <time>{formatTime(message.timestamp)}</time>
                </div>
              </div>
            ))}
            {loading && (
              <div className="ask-bubble ask-reply">
                <span className="ask-bubble-avatar">
                  <img className="chatbot-orb" src="/images/chatbot-orb.webp" alt="" />
                </span>
                <div className="ask-bubble-content">
                  <p className="ask-typing-indicator">
                    <span className="ask-typing-dots">
                      <i /><i /><i />
                    </span>
                    {thinkingText}
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion chips */}
          <div className="ask-prompts">
            {currentPrompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => void ask(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          {/* Input */}
          <form className="ask-form" onSubmit={submit}>
            <input
              ref={inputRef}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about a project…"
              aria-label="Ask a portfolio question"
            />
            <button type="submit" aria-label="Send question" disabled={loading}>
              <ArrowUp size={14} />
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
