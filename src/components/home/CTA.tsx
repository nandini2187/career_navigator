import { ArrowRight, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { navigate } from '@/lib/router';

export function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 px-8 py-16 text-center shadow-glass-lg lg:px-16 lg:py-20">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent-300/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to pilot your career?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
                Join thousands of engineering students who stopped guessing and started
                preparing the smart way. It is free to start.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-primary-700 shadow-lg transition-all hover:bg-primary-50"
                >
                  Create your free account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => navigate('/pricing')}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20"
                >
                  View pricing
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
