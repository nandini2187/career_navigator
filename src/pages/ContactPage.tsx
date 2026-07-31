import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Reveal } from '@/components/ui/Reveal';
import { toast } from '@/components/ui/Toaster';

const contactInfo = [
  { icon: Mail, label: 'Email us', value: 'hello@careerpilot.ai', href: 'mailto:hello@careerpilot.ai' },
  { icon: Phone, label: 'Call us', value: '+91 80 4567 8900', href: 'tel:+918045678900' },
  { icon: MapPin, label: 'Visit us', value: 'Bengaluru, Karnataka, India', href: '#' },
];

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast('Please fill in all required fields.', 'error');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    toast('Message sent! We will get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main>
        <section className="bg-mesh pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="container-px">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="badge bg-primary-100 text-primary-700">Contact</span>
              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
                Let&rsquo;s talk about <span className="text-gradient">your career</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-600">
                Questions, partnerships, or campus inquiries — we are here to help you take off.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-12 lg:py-20">
          <div className="container-px">
            <div className="grid gap-10 lg:grid-cols-5">
              {/* Info column */}
              <Reveal className="lg:col-span-2">
                <div className="glass-card h-full p-7">
                  <h3 className="font-display text-xl font-bold text-ink-900">Get in touch</h3>
                  <p className="mt-2 text-sm text-ink-600">
                    Reach out through any channel below, or fill out the form and our team will
                    respond within 24 hours.
                  </p>
                  <div className="mt-6 space-y-5">
                    {contactInfo.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        className="flex items-center gap-4 rounded-xl border border-ink-100 bg-white/60 p-4 transition-all hover:border-primary-200 hover:bg-primary-50/40"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500">
                          <c.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-ink-500">{c.label}</p>
                          <p className="text-sm font-semibold text-ink-900">{c.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-3 rounded-xl bg-accent-50 p-4">
                    <Clock className="h-5 w-5 text-accent-700" />
                    <p className="text-sm text-ink-700">
                      <span className="font-semibold">Response time:</span> within 24 hours, Mon&ndash;Fri.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Form column */}
              <Reveal className="lg:col-span-3" delay={100}>
                <form onSubmit={handleSubmit} className="glass-card h-full p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100">
                      <MessageSquare className="h-5 w-5 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink-900">Send a message</h3>
                      <p className="text-sm text-ink-500">We would love to hear from you.</p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="input-label" htmlFor="name">Full name *</label>
                      <input
                        id="name"
                        className="input-field"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="input-label" htmlFor="email">Email *</label>
                      <input
                        id="email"
                        type="email"
                        className="input-field"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <label className="input-label" htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      className="input-field"
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>
                  <div className="mt-5">
                    <label className="input-label" htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Tell us a bit more..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full">
                    {submitting ? 'Sending...' : 'Send message'}
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
