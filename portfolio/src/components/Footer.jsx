import { personal } from '../data';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-8 text-center">
      <p className="text-white/30 text-sm font-body">
        Built with React + Vite + Tailwind CSS by{' '}
        <span className="grad-text font-semibold">{personal.name}</span>
      </p>
      <p className="text-white/20 text-xs mt-1">© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}
