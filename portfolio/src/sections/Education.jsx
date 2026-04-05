import { education } from '../data';
import { useReveal } from '../hooks/useReveal';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const icons = {
  university: <GraduationCap size={20} />,
  certificate: <Award size={20} />,
  alevel: <BookOpen size={20} />,
  olevel: <BookOpen size={20} />,
};

export default function Education() {
  const ref = useReveal();

  return (
    <section id="education" className="section">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal">
          <h2 className="section-title font-display">
            <span className="grad-text">Education</span>
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-blue-500/30 to-transparent hidden md:block" />

            <div className="space-y-6">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="relative md:pl-16 group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-3.5 top-6 w-5 h-5 rounded-full bg-gradient-to-br ${edu.color} hidden md:flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300`}
                    style={{ transform: 'translateX(-50%)' }}
                  />

                  <div className="glass rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${edu.color} flex items-center justify-center text-white shrink-0 shadow-md`}
                      >
                        {icons[edu.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="font-display font-bold text-white text-base leading-tight">
                              {edu.degree}
                            </h3>
                            <p className="text-white/50 text-sm mt-0.5">{edu.field}</p>
                          </div>
                          <span className="text-xs text-white/40 font-mono shrink-0 mt-1 glass px-3 py-1 rounded-full">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-violet-300/70 text-sm mt-2 font-medium">
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
