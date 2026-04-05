import { skills } from '../data';
import { useReveal } from '../hooks/useReveal';

export default function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" className="section">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal">
          <h2 className="section-title font-display">
            Technical <span className="grad-text">Skills</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map(({ category, color, items }) => (
              <div
                key={category}
                className="glass rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${color}`} />
                  <h3 className="font-display font-semibold text-sm text-white/80 uppercase tracking-widest">
                    {category}
                  </h3>
                </div>

                {/* Pills */}
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="skill-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
