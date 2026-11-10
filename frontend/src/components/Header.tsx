import { ArrowDownRight, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { profile } from '../data/portfolio';

export function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Prathmesh home">
        <span className="brand-mark">
          <img className="brand-avatar" src="/images/profile-prathmesh.webp" alt="" />
        </span>
        <span className="brand-name">
          PRATHMESH PIMPALSHENDE
          <br />
          <small>FIELD NOTES · 2026</small>
        </span>
      </a>
      <nav className="topnav" aria-label="Primary navigation">
        <a href="#story">01 / STORY</a>
        <a href="#work">02 / WORK</a>
        <a href="#systems">03 / SYSTEMS</a>
      </nav>
      <a className="nav-terminal" href="#terminal">
        TRY TERMINAL <ArrowDownRight size={13} />
      </a>
      <div className="nav-socials" aria-label="Social profiles">
        <a className="nav-social-link nav-social-linkedin" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
          <Linkedin size={14} aria-hidden="true" />
        </a>
        <a className="nav-social-link nav-social-github" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
          <Github size={15} aria-hidden="true" />
        </a>
      </div>
      <a className="nav-contact" href="#contact">
        CONTACT <ArrowUpRight size={13} />
      </a>
    </header>
  );
}
