import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Package, Plane, Truck, ShieldCheck, ArrowRight, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Meta } from '../components/seo/Meta';
import { siteConfig } from '../config/site';

const features = [
  { icon: Truck, title: 'Door‑to‑Door', desc: 'Pickup and delivery on the corridor.' },
  { icon: Plane, title: 'Air & Surface', desc: 'Time‑sensitive or economical modes.' },
  { icon: ShieldCheck, title: 'Careful Handling', desc: 'Fragile and high‑value shipments.' },
];

const steps = [
  { title: 'Share shipment details', desc: 'Origin, destination, weight, and timeline.' },
  { title: 'We schedule & handle', desc: 'Mode selection, pickup, and safe transit.' },
  { title: 'Track & receive', desc: 'Simple updates until delivery.' },
];

export default function Landing() {
  useEffect(() => {
    document.title = 'Tapan Associate Cargo — Imphal ↔ New Delhi';
  }, []);

  const [autoplay, setAutoplay] = useState(true);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setAutoplay(!mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#content" className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 rounded px-3 py-2 bg-primary text-primary-foreground">Skip to content</a>
      <Meta
        title={siteConfig.seo.title}
        description={siteConfig.seo.description}
        keywords={siteConfig.seo.keywords}
        ogImage={siteConfig.seo.ogImage}
        canonical={siteConfig.seo.canonical}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md border border-border flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold">{siteConfig.name}</div>
              <div className="text-xs text-muted-foreground">{`${siteConfig.corridor.primary.from} ↔ ${siteConfig.corridor.primary.to}`}</div>
            </div>
          </div>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">Features</a>
            <a href="#process" className="hover:text-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">How it works</a>
            <a href="#pricing" className="hover:text-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">Pricing</a>
            <a href="#faq" className="hover:text-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">FAQ</a>
            <a href="#contact" className="hover:text-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">Contact</a>
            <a href="/login">
              <Button size="sm" className="gap-2">
                Admin Login <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </nav>
          <div className="md:hidden">
            <a href="/login">
              <Button size="sm" className="gap-2">
                Login <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main id="content">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 md:pt-24 md:pb-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                Reliable cargo on the <span className="text-primary">Imphal ↔ New Delhi</span> corridor
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                15+ years of dependable logistics. Flexible air and surface options with careful handling and local expertise.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`/dashboard`}>
                  <Button className="gap-2">Admin Login <ArrowRight className="w-4 h-4" /></Button>
                </a>
                <a href={`mailto:${siteConfig.contact.email}?subject=Quote%20request`}>
                  <Button variant="outline">Get a Quote</Button>
                </a>
                <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer">
                  <Button variant="secondary" className="gap-2"><MessageCircle className="w-4 h-4" /> WhatsApp</Button>
                </a>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">INR Billing</Badge>
                <Badge variant="secondary">Door‑to‑Door</Badge>
                <Badge variant="secondary">Fragile Care</Badge>
              </div>
            </div>
            <div aria-hidden className="relative">
              <div className="rounded-xl border border-border bg-card overflow-hidden aspect-[4/3]">
                <DotLottieReact
                  key={autoplay ? 'play' : 'pause'}
                  src={"https://lottie.host/d9d8d772-903a-41ef-a901-83f563958bd3/zCZw5QsgSg.lottie"}
                  loop
                  autoplay={autoplay}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-5 border border-border rounded-xl bg-background/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div className="font-medium">{f.title}</div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="process" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="p-5 border border-border rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="text-sm text-muted-foreground w-8">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <div className="font-medium">{s.title}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="max-w-md mx-auto p-8 border border-border rounded-xl text-center">
            <div className="text-lg font-medium">Simple, transparent pricing</div>
            <p className="mt-3 text-sm text-muted-foreground">Request a tailored quote for your shipment. INR billing. No hidden fees.</p>
            <div className="mt-6">
              <a href={`mailto:${siteConfig.contact.email}?subject=Quote%20request`}>
                <Button className="w-full">Request a quote</Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="space-y-3">
            {[{q:'What areas do you cover?', a:`Primary corridor ${siteConfig.corridor.primary.from} ↔ ${siteConfig.corridor.primary.to}; hubs: ${siteConfig.corridor.hubs.join(', ')}.`}, {q:'Which modes are available?', a:'Air and surface freight. Transit times vary by season and load.'}, {q:'How do I get a quote?', a:`Use Get a Quote or email ${siteConfig.contact.email}.`}].map(item => (
              <details key={item.q} className="rounded-lg p-4 border border-border">
                <summary className="cursor-pointer font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded">{item.q}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-border rounded-xl">
              <div className="text-lg font-medium">Contact</div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-3"><Mail className="w-4 h-4 mt-0.5" /><a className="hover:underline" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></div>
                <div className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5" /><span className="text-muted-foreground">{siteConfig.contact.imphalAddress}</span></div>
              </div>
            </div>
            <div className="p-6 border border-border rounded-xl">
              <div className="text-lg font-medium">About {siteConfig.shortName}</div>
              <p className="mt-3 text-sm text-muted-foreground">
                Dependable cargo on the {`${siteConfig.corridor.primary.from} ↔ ${siteConfig.corridor.primary.to}`} corridor with careful handling and local expertise.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-center text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} {siteConfig.name} · GSTIN: {siteConfig.legal.gstin}</span>
        </div>
      </footer>
    </div>
  );
}
