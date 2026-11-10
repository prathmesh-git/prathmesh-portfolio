import { ArrowDown, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { profile } from '../data/portfolio';

export function Hero() {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1.04, 1.2]);
  const imageY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -34]);

  return (
    <section ref={heroRef} className="hero shell" id="home">
      <motion.div
        className="hero-copy"
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.7 }}
      >
        <div className="eyebrow">
          <span className="live-dot" /> CLOUD / LINUX / SYSTEMS{' '}
          <span className="eyebrow-place">· PUNE, INDIA</span>
        </div>
        <h1>
          <span>Prathmesh</span>
          <br />
          <em>Pimpalshende.</em>
        </h1>
        <div className="hero-role-row">
          <p className="hero-role">ASPIRING CLOUD &amp; DEVOPS ENGINEER</p>
          <span className="availability-pill">
            <i aria-hidden="true" /> OPEN TO OPPORTUNITIES
          </span>
        </div>
        <p className="hero-lead">
          I build across the application and the infrastructure beneath it. Lately, I’ve been deep
          in Linux, AWS, and the question: what happens after deploy?
        </p>
        <div className="hero-actions">
          <a className="button button-green" href="#work">
            Explore the work <ArrowDown size={14} />
          </a>
          <a className="button button-quiet" href={profile.resume} target="_blank" rel="noreferrer">
            View résumé <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="hero-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={13} /> GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={13} /> LinkedIn ↗
          </a>
          <a href={`mailto:${profile.email}`}>Email ↗</a>
        </div>
      </motion.div>
      <motion.figure
        className="hero-art"
        aria-label="Digital violet and cyan hands reaching through a signal field"
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.75, delay: 0.12 }}
      >
        <motion.img
          src="/images/signal-hands.webp"
          alt="Violet and cyan wireframe hands reaching through a digital signal field"
          fetchPriority="high"
          style={{ scale: imageScale, y: imageY }}
        />
        <span className="hero-art-index">
          FIG. 01 <i>—</i> SIGNAL / TOUCH
        </span>
        <span className="hero-art-coordinate">
          18°31′N
          <br />
          73°51′E
        </span>
        <figcaption>
          <b>Curiosity, translated into infrastructure.</b>
          <span>LINUX → CLOUD → AUTOMATION</span>
        </figcaption>
      </motion.figure>
      <div className="hero-bottom">
        <span>PORTFOLIO / 01—07</span>
        <span>FROM CODE TO THE SYSTEMS AROUND IT</span>
        <a href="#story">
          KEEP GOING <ArrowDown size={11} />
        </a>
      </div>
    </section>
  );
}
