import { useState } from 'react';
import { Send, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { personal } from '../data';
import { useReveal } from '../hooks/useReveal';

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form submission failed:', error);

      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal">
          <h2 className="section-title font-display">
            Get in <span className="grad-text">Touch</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left — info */}
            <div className="space-y-6">
              <p className="text-white/60 leading-relaxed">
                I'm open to internship opportunities, freelance projects, and collaborations.
                Feel free to reach out — I'd love to connect!
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Mail size={18} />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
                  { icon: <MapPin size={18} />, label: 'Location', value: personal.location },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="glass rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-500/20 flex items-center justify-center text-violet-300">
                      {icon}
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider">{label}</p>
                      {href ? (
                        <a href={href} className="text-white/80 text-sm hover:text-violet-300 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-white/80 text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="flex gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="glass flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:border-white/25 transition-all hover:-translate-y-1"
                >
                  <Github size={16} /> GitHub
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="glass flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:border-white/25 transition-all hover:-translate-y-1"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div className="glass-strong rounded-2xl p-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="glass-input"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="glass-input"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="What's on your mind?"
                    className="glass-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-solid w-full flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  ) : (
                    <Send size={16} />
                  )}
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'sent' && <p className="text-center text-emerald-400 text-sm">✓ Message sent successfully.</p>}
                {status === 'error' && (
                  <p className="text-center text-amber-300 text-sm">
                    Backend unavailable, so your mail client opened instead.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
