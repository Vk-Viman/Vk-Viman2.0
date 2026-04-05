import { MapPin, Mail, Phone, Download } from 'lucide-react';
import { personal } from '../data';
import { useReveal } from '../hooks/useReveal';

const stats = [
  { value: '7+', label: 'Projects Built' },
  { value: '10+', label: 'Technologies' },
  { value: '2+', label: 'Years Coding' },
  { value: '4', label: 'ML Models' },
];

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="section">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal">
          <h2 className="section-title font-display">
            <span className="grad-text">About</span> Me
          </h2>

          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            {/* Text block */}
            <div className="space-y-5">
              <p className="text-white/70 leading-relaxed text-base">
                {personal.summary}
              </p>
              <p className="text-white/60 leading-relaxed text-sm">
                Outside of coding, I play Chess, Basketball, Swimming, Table Tennis & Cricket.
                I'm also involved in the English & Sinhala Literary Associations and Green Club at university.
              </p>

              {/* Contact info */}
              <div className="space-y-2 pt-2">
                {[
                  { icon: <MapPin size={15} />, text: personal.location },
                  { icon: <Mail size={15} />, text: personal.email, href: `mailto:${personal.email}` },
                  { icon: <Phone size={15} />, text: personal.phone },
                ].map(({ icon, text, href }) => (
                  <div key={text} className="flex items-center gap-3 text-white/50 text-sm">
                    <span className="text-violet-400">{icon}</span>
                    {href ? (
                      <a href={href} className="hover:text-violet-300 transition-colors">{text}</a>
                    ) : (
                      <span>{text}</span>
                    )}
                  </div>
                ))}
              </div>

              <a href="/Viman_Kavinda_CV.pdf" download className="btn-solid inline-flex items-center gap-2 mt-2 text-sm">
                <Download size={16} />
                Download Resume
              </a>
            </div>

            {/* Stats grid */}
            <div className="md:max-w-md md:ml-auto w-full">
              <div className="glass rounded-3xl p-3 overflow-hidden border border-white/10">
                <div className="h-[260px] md:h-[360px] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                  {personal.photo ? (
                    <img
                      src={personal.photo}
                      alt={personal.photoAlt || personal.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-violet-500/20 via-blue-500/15 to-emerald-400/20">
                      <span className="font-display font-bold text-6xl grad-text">VK</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {stats.map(({ value, label }) => (
              <div key={label} className="glass rounded-2xl p-6 text-center hover:border-violet-400/30 transition-all duration-300 group">
                <div className="font-display font-bold text-4xl grad-text mb-1 group-hover:scale-110 transition-transform duration-300">
                  {value}
                </div>
                <div className="text-white/50 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
