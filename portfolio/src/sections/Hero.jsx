import { Github, Linkedin, ExternalLink, ChevronDown } from 'lucide-react';
import { personal } from '../data';
import { useEffect, useState } from 'react';

const roles = [
  'Full-Stack Developer',
  'React & Node.js Engineer',
  'Mobile App Developer',
  'UI/UX Enthusiast',
  'ML Explorer',
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ zIndex: 10 }}
    >
      {/* Glowing avatar ring */}
      <div className="animate-fade-up delay-100 mb-8 relative">
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full animate-pulse-glow relative mx-auto">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-emerald-400 p-[3px]">
            <div className="w-full h-full rounded-full glass overflow-hidden flex items-center justify-center">
              {personal.photo ? (
                <img
                  src={personal.photo}
                  alt={personal.photoAlt || personal.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-display font-bold text-4xl grad-text">VK</span>
              )}
            </div>
          </div>
        </div>
        {/* Status dot */}
        <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-400 rounded-full border-2 border-[#0f0c29] shadow-lg shadow-emerald-400/50" />
      </div>

      {/* Name */}
      <h1 className="animate-fade-up delay-200 font-display font-bold text-5xl md:text-7xl leading-tight mb-3">
        <span className="text-white">{personal.name}</span>
      </h1>

      {/* Typing role */}
      <div className="animate-fade-up delay-300 h-10 flex items-center justify-center mb-5">
        <span className="font-mono text-lg md:text-2xl text-violet-300">
          {displayed}
          <span className="inline-block w-[2px] h-6 bg-violet-400 ml-[2px] animate-pulse" />
        </span>
      </div>

      {/* Tagline */}
      <p className="animate-fade-up delay-400 max-w-xl text-white/60 text-base md:text-lg leading-relaxed mb-8">
        {personal.summary.split('.')[0]}.
      </p>

      {/* CTA buttons */}
      <div className="animate-fade-up delay-500 flex flex-wrap gap-4 justify-center mb-10">
        <a href="#projects" className="btn-solid">
          View Projects
        </a>
        <a href="#contact" className="btn-glow">
          Get in Touch
        </a>
      </div>

      {/* Social links */}
      <div className="animate-fade-up delay-600 flex gap-5 justify-center">
        {[
          { href: personal.github, icon: <Github size={18} />, label: 'GitHub' },
          { href: personal.linkedin, icon: <Linkedin size={18} />, label: 'LinkedIn' },
          { href: personal.portfolio, icon: <ExternalLink size={18} />, label: 'Portfolio' },
        ].map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="glass flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
          >
            {icon}
            <span>{label}</span>
          </a>
        ))}
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="animate-fade-up delay-700 absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors animate-float"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
