import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../data';
import { useReveal } from '../hooks/useReveal';
import { useState } from 'react';

function ProjectCard({ project, featured }) {
  return (
    <div className={`project-card glass p-6 ${featured ? 'md:col-span-1' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-2xl shadow-lg`}>
            {project.icon}
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base leading-tight">
              {project.title}
            </h3>
            <p className="text-white/40 text-xs mt-0.5">{project.subtitle}</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-2 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="glass w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
            >
              <Github size={15} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="glass w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-white/55 text-sm leading-relaxed mb-4">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${project.color} bg-opacity-10 text-white/70 border border-white/10`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useReveal();
  const [showAll, setShowAll] = useState(false);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const visible = showAll ? rest : rest.slice(0, 3);

  return (
    <section id="projects" className="section">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal">
          <h2 className="section-title font-display">
            <span className="grad-text">Projects</span>
          </h2>

          {/* Featured */}
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-6 -mt-6">Featured</p>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {featured.map((p) => (
              <ProjectCard key={p.title} project={p} featured />
            ))}
          </div>

          {/* Other */}
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-6">Other Projects</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {visible.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>

          {rest.length > 3 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="btn-glow text-sm"
              >
                {showAll ? 'Show Less' : `Show More (${rest.length - 3} more)`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
