import { Reveal } from '@/components/ui/Reveal';

const stats = [
  { value: '50K+', label: 'Students guided' },
  { value: '92%', label: 'Placement readiness improvement' },
  { value: '1.2M+', label: 'Learning hours tracked' },
  { value: '15K+', label: 'Mock interviews completed' },
];

export function Stats() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-px">
        <Reveal>
          <div className="glass-card grid grid-cols-2 gap-8 p-8 lg:grid-cols-4 lg:p-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl font-extrabold text-gradient lg:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm font-medium text-ink-600">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
