import { Rocket } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textClass?: string;
}

export function Logo({ className = '', showText = true, textClass = 'text-ink-900' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 shadow-lg shadow-primary-600/30">
        <Rocket className="h-5 w-5 text-white" />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent-400 ring-2 ring-white" />
      </div>
      {showText && (
        <span className={`font-display text-lg font-extrabold tracking-tight ${textClass}`}>
          Career<span className="text-gradient">Pilot</span>AI
        </span>
      )}
    </div>
  );
}
