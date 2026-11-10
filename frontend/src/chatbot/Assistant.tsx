import { FormEvent, useEffect, useState } from 'react';
import { ArrowUp, X } from 'lucide-react';

type Message = { role: 'assistant' | 'user'; text: string };
const prompts = ['AWS experience', 'Linux skills', 'Docker'];
const offlineAnswers: { pattern: RegExp; answer: string }[] = [
  {
    pattern: /aws|clouddataflow|cloud|infrastructure|moodle/i,
    answer:
      'Prathmesh built CloudDataFlow, an event-driven AWS pipeline. Its architecture uses S3 events, Python Lambda, RDS MySQL, an EC2 Auto Scaling web tier behind an ALB, VPC subnets, and IAM roles. These details are from his résumé and project README.',
  },
  {
    pattern: /linux|bash|rhel|admin/i,
    answer:
      'His Linux Administration Toolkit is a menu-driven Bash toolkit for RHEL. It covers system monitoring, user and group management, disk threshold warnings, timestamped compressed backups with logging, and log analysis.',
  },
  {
    pattern: /docker|container/i,
    answer:
      'Docker appears in his Unreel project stack, and the app repository documents a Docker deployment setup. His résumé emphasizes Linux, AWS, and full-stack development; this portfolio describes Docker as working knowledge.',
  },
  {
    pattern: /intern|experience|digital guruji/i,
    answer:
      'Prathmesh was a remote Web Development Intern at Digital Guruji from April to July 2025. He built responsive interfaces and helped debug and implement full-stack features across client projects.',
  },
  {
    pattern: /education|degree|college|university/i,
    answer:
      'He completed a B.Tech in Computer Science at GH Raisoni University, Nagpur, in 2026, with a 7.91 / 10 score.',
  },
  {
    pattern: /available|opportunit|hire|role|job/i,
    answer:
      'Yes. Prathmesh is actively looking for full-time opportunities in cloud engineering, DevOps, infrastructure engineering, and cloud operations. He is based in Pune, India.',
  },
  {
    pattern: /project|unreel|fact.check|ai/i,
    answer:
      'Unreel is a deployed fact-checking application for short-form videos. It combines transcription, on-screen text extraction, Groq claim analysis, Tavily web search, and MongoDB persistence.',
  },
];
function offlineReply(question: string) {
  return (
    offlineAnswers.find(({ pattern }) => pattern.test(question))?.answer ??
    'I’m in demo mode and can only answer from the verified facts on this page. Try asking about AWS, Linux, Docker, Unreel, education, or availability.'
  );
}

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'DEMO MODE' | 'AI MODE'>('DEMO MODE');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hi! Ask me about Prathmesh’s projects, tools, or experience.' },
  ]);

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
    setMessages((current) => [...current, { role: 'user', text }]);
    setQuestion('');
    setLoading(true);
    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const response = await fetch(`${apiBase}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
      });
      if (!response.ok) throw new Error('Assistant is unavailable');
      const payload: { answer: string; mode: 'demo' | 'ai' } = await response.json();
      setMode(payload.mode === 'ai' ? 'AI MODE' : 'DEMO MODE');
      setMessages((current) => [...current, { role: 'assistant', text: payload.answer }]);
    } catch {
      setMode('DEMO MODE');
      setMessages((current) => [...current, { role: 'assistant', text: offlineReply(text) }]);
    } finally {
      setLoading(false);
    }
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    void ask(question);
  };

  return (
    <>
      <button
        className="ask-launcher"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <img className="chatbot-orb" src="/images/chatbot-orb.webp" alt="" aria-hidden="true" />
        Ask Prathmesh
      </button>
      {open && (
        <aside className="ask-panel" aria-label="Ask Prathmesh portfolio assistant">
          <div className="ask-head">
            <div>
              <span className="ask-avatar">
                <img className="chatbot-orb" src="/images/chatbot-orb.webp" alt="" />
              </span>
              <span>
                <b>Ask Prathmesh</b>
                <small>Portfolio guide · {mode.toLowerCase()}</small>
              </span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant">
              <X size={17} />
            </button>
          </div>
          <div className="ask-demo-note">{mode} · ANSWERS USE VERIFIED PORTFOLIO DETAILS</div>
          <div className="ask-messages" aria-live="polite">
            {messages.map((message, index) => (
              <p key={index} className={message.role === 'user' ? 'ask-user' : 'ask-reply'}>
                {message.text}
              </p>
            ))}
            {loading && <p className="ask-reply">Checking the portfolio…</p>}
          </div>
          <div className="ask-prompts">
            {prompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => void ask(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
          <form onSubmit={submit}>
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about a project…"
              aria-label="Ask a portfolio question"
            />
            <button aria-label="Send question" disabled={loading}>
              <ArrowUp size={15} />
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
