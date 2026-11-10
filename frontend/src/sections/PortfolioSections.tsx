import { ArrowUpRight, BookOpen, GraduationCap, Mail } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import {
  education,
  experience,
  learningActivities,
  profile,
  projects,
  skillGroups,
} from '../data/portfolio';
import { Reveal } from '../components/Reveal';

function SectionLabel({ number, label, note }: { number: string; label: string; note?: string }) {
  return (
    <div className="section-kicker">
      <span>{number}</span>
      <span>{label}</span>
      {note && <span className="kicker-note">{note}</span>}
    </div>
  );
}

const cinematicScenes = [
  {
    src: '/images/cyber-anime.jpg',
    alt: 'A blue digital scene layered with code and computer windows',
    chapter: '01 / THE INTERFACE',
    title: 'Start with what people use.',
    body: 'I began by building responsive web interfaces and full-stack features.',
  },
  {
    src: '/images/escape-key.webp',
    alt: 'A polished escape key floating against a black background',
    chapter: '02 / THE SYSTEM',
    title: 'Look closer at the layers.',
    body: 'Linux, networks, permissions, and services shape what an application can do.',
  },
  {
    src: '/images/windows-glitch.webp',
    alt: 'A computer error screen layered over a blue digital background',
    chapter: '03 / THE SIGNAL',
    title: 'Make the invisible legible.',
    body: 'Logs, events, and metrics help explain what a system is doing.',
  },
  {
    src: '/images/orbit-entity.webp',
    alt: 'A luminous figure with a blue orbital ring',
    chapter: '04 / THE CLOUD',
    title: 'Connect the pieces.',
    body: 'My AWS project work brings services, network boundaries, and access together.',
  },
];

function PinnedScene({
  scene,
  index,
  progress,
}: {
  scene: (typeof cinematicScenes)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const count = cinematicScenes.length;
  const step = 1 / count;
  const center = (index + 0.5) * step;
  const start = Math.max(0, center - step * 0.78);
  const fadeInEnd = center - step * 0.35;
  const fadeOutStart = center + step * 0.35;
  const end = Math.min(1, center + step * 0.78);
  const opacity = useTransform(
    progress,
    [start, fadeInEnd, fadeOutStart, end],
    [index === 0 ? 1 : 0, 1, 1, index === count - 1 ? 1 : 0],
  );
  const scale = useTransform(progress, [0, 1], [1.04, 1.16]);
  const y = useTransform(progress, [0, 1], [22, -22]);

  return (
    <motion.figure className="cinematic-frame" style={{ opacity, scale, y }}>
      <img src={scene.src} alt={scene.alt} />
      <figcaption className="cinematic-frame-copy">
        <span>{scene.chapter}</span>
        <h3>{scene.title}</h3>
        <p>{scene.body}</p>
      </figcaption>
    </motion.figure>
  );
}

export function CinematicJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progressBar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className={`cinematic-story ${reducedMotion ? 'cinematic-story-static' : ''}`}
      aria-label="A visual story about my path from web development to cloud engineering"
    >
      {reducedMotion ? (
        <div className="cinematic-static shell">
          <div className="cinematic-static-heading">
            <span>02 / THE JOURNEY</span>
            <h2>
              Beyond what <em>you can see.</em>
            </h2>
          </div>
          <div className="cinematic-static-grid">
            {cinematicScenes.map((scene) => (
              <article key={scene.src}>
                <img src={scene.src} alt={scene.alt} loading="lazy" />
                <span>{scene.chapter}</span>
                <h3>{scene.title}</h3>
                <p>{scene.body}</p>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="cinematic-pin shell">
          <aside className="cinematic-aside">
            <span className="cinematic-kicker">02 / THE JOURNEY</span>
            <h2>
              Beyond what <em>you can see.</em>
            </h2>
            <p>From the interface to the infrastructure beneath it.</p>
            <div className="cinematic-progress" aria-hidden="true">
              <motion.span style={{ scaleX: progressBar }} />
            </div>
            <span className="cinematic-scroll-hint">
              KEEP SCROLLING <b>↓</b>
            </span>
          </aside>
          <div className="cinematic-stage">
            <div className="cinematic-image-index" aria-hidden="true">
              01 — 04 <span>SCROLL SEQUENCE</span>
            </div>
            {cinematicScenes.map((scene, index) => (
              <PinnedScene key={scene.src} scene={scene} index={index} progress={scrollYProgress} />
            ))}
            <div className="cinematic-grain" aria-hidden="true" />
          </div>
        </div>
      )}
    </section>
  );
}

export function Story() {
  return (
    <section className="story-section section-pad" id="story">
      <div className="shell">
        <Reveal>
          <SectionLabel number="01" label="THE THROUGH-LINE" />
          <div className="story-grid">
            <h2>
              From writing features
              <br />
              to understanding
              <br />
              <em>what runs beneath.</em>
            </h2>
            <div className="story-copy">
              <p className="large-copy">
                I started with software development. Building across the stack made me curious about
                everything around the code: the machines, networks, permissions, and services that
                keep an application available.
              </p>
              <p>
                That curiosity led me deeper into Linux administration and AWS. I’m now building
                practical infrastructure projects, learning through the problems they expose, and
                looking for a team where I can keep growing.
              </p>
              <div className="education-line">
                <GraduationCap className="edu-icon" size={22} />
                <span>
                  <b>{education.degree}</b>
                  <small>
                    {education.institution} · {education.years} · {education.score}
                  </small>
                </span>
              </div>
              <div className="credential-line">
                <BookOpen size={18} aria-hidden="true" />
                <span>
                  <b>Training &amp; participation</b>
                  <small>
                    Full Stack Web Development &amp; DSA in Java · Apna College · 2025—present;
                    university AI/ML hackathon participant
                  </small>
                </span>
              </div>
            </div>
            <figure className="story-art">
              <img
                src="/images/luminous-form.webp"
                alt="A luminous figure made of particles, a visual for the systems beneath software"
                loading="lazy"
              />
              <figcaption>
                THE PARTS YOU DON’T SEE STILL MATTER <span>— FIELD NOTE 001</span>
              </figcaption>
            </figure>
          </div>
        </Reveal>
        <div className="journey">
          <div className="journey-line" />
          <Reveal>
            <article>
              <span className="journey-year">{education.years}</span>
              <div>
                <b>Computer Science</b>
                <p>
                  B.Tech at GH Raisoni University. A foundation in programming, systems, and
                  computer science.
                </p>
              </div>
              <span className="journey-tag">EDUCATION</span>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article>
              <span className="journey-year">APR—JUL ’25</span>
              <div>
                <b>
                  {experience.role} · {experience.company}
                </b>
                <p>
                  {experience.bullets[0]} {experience.bullets[1]}
                </p>
              </div>
              <span className="journey-tag">EXPERIENCE</span>
            </article>
          </Reveal>
          <Reveal delay={0.16}>
            <article>
              <span className="journey-year">NOW</span>
              <div>
                <b>Cloud &amp; systems, learned hands-on</b>
                <p>
                  Building with AWS, practicing Linux administration, and connecting application
                  work to infrastructure.
                </p>
              </div>
              <span className="journey-tag">DIRECTION</span>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section className="work-section section-pad" id="work">
      <div className="shell">
        <Reveal>
          <SectionLabel number="02" label="SELECTED WORK" note="PROJECTS WITH A SYSTEMS STORY" />
          <div className="section-heading">
            <h2>
              Built to understand
              <br />
              <em>the whole path.</em>
            </h2>
            <p>
              Four projects, each a different way to learn how software, data, and infrastructure
              fit together.
            </p>
          </div>
        </Reveal>
        {projects.map((project, index) => (
          <Reveal key={project.number} delay={index % 2 ? 0.06 : 0}>
            <article className={`project ${index % 2 ? 'project-reverse' : ''}`}>
              <figure className="project-art">
                <img src={project.thumbnail} alt={project.thumbnailAlt} loading="lazy" />
                <figcaption>
                  {project.number} / {project.title}
                </figcaption>
              </figure>
              <div className="project-copy">
                <div className="project-meta">
                  <span>
                    {project.number} / {project.category}
                  </span>
                  <span>{project.label}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-intro">{project.summary}</p>
                <p className="project-detail">{project.detail}</p>
                <div className="tag-row">
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.live && (
                    <a className="text-link" href={project.live} target="_blank" rel="noreferrer">
                      Visit live project <ArrowUpRight size={13} />
                    </a>
                  )}
                  <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">
                    {project.live ? 'Source code' : 'Open project on GitHub'}{' '}
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="skills-section section-pad">
      <div className="shell">
        <Reveal>
          <SectionLabel number="04" label="WHAT I CAN WORK WITH" />
          <div className="section-heading">
            <h2>
              Tools make sense
              <br />
              <em>in context.</em>
            </h2>
            <p>A practical snapshot, grounded in what I’ve built and practiced so far.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((skill) => (
              <article className="skill-group" key={skill.number}>
                <span className="skill-number">{skill.number}</span>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <div className="skill-foot">
                  <span>{skill.level}</span>
                  <span>{skill.tools}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="skill-note">
            <span>ALSO USED</span>
            <p>Python · Java · JWT / OAuth · GitHub · Whisper · Groq · Tavily · FFmpeg</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CurrentFocus() {
  return (
    <section className="now-section section-pad">
      <div className="shell now-grid">
        <Reveal>
          <SectionLabel number="06" label="RIGHT NOW" />
          <h2>
            Currently building
            <br />
            <em>my next chapter.</em>
          </h2>
          <p>
            I’m sharpening the fundamentals that connect an application to the infrastructure it
            depends on.
          </p>
          <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
            Follow along on GitHub <ArrowUpRight size={13} />
          </a>
        </Reveal>
        <div className="now-list">
          {learningActivities.map((activity, i) => (
            <Reveal key={activity.title} delay={i * 0.08}>
              <article>
                <span className={`now-pulse ${i === 2 ? 'now-pulse-muted' : ''}`} />
                <small>FOCUS 0{i + 1}</small>
                <div>
                  <b>{activity.title}</b>
                  <p>{activity.description}</p>
                </div>
                <span className="now-status">{activity.status}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact-section section-pad" id="contact">
      <div className="shell">
        <Reveal>
          <div className="contact-frame">
            <div className="contact-glow" />
            <SectionLabel number="07" label="THE NEXT STEP" />
            <h2>
              Let’s build something
              <br />
              <em>that holds up.</em>
            </h2>
            <p>
              I’m actively looking for full-time opportunities in cloud engineering, DevOps,
              infrastructure, and cloud operations.
            </p>
            <div className="contact-actions">
              <a className="button button-green" href={`mailto:${profile.email}`}>
                Start a conversation <Mail size={14} />
              </a>
              <a
                className="button button-quiet"
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
              >
                Open résumé <BookOpen size={14} />
              </a>
            </div>
            <div className="contact-foot">
              <a href={`mailto:${profile.email}`}>{profile.email.toUpperCase()}</a>
              <span>{profile.location.toUpperCase()}</span>
            </div>
          </div>
          <footer className="page-footer">
            <span>© 2026 PRATHMESH PIMPALSHENDE</span>
            <span>
              BUILT WITH CURIOSITY <i>✳</i>
            </span>
            <a href="#home">BACK TO TOP ↑</a>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
