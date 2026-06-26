import { memo, useEffect, useMemo, useState, type CSSProperties, type MouseEvent } from 'react';
import { ArrowRight, Play, Star, ChevronRight } from 'lucide-react';
import { type Currency, type BillingCycle, type PlanKey } from './utils/pricingMatrix';
import AssetIcon from './components/AssetIcon';
import { usePricing } from './hooks/usePricing';
import { useResize } from './hooks/useResize';
import { useIntersection } from './hooks/useIntersection';
import { motionClass } from './utils/animations';

type Feature = {
  id: number;
  title: string;
  description: string;
  metric: string;
  icon: 'sparkles' | 'chart' | 'link' | 'cog';
  size: 'large' | 'medium' | 'tall';
};

const features: Feature[] = [
  {
    id: 1,
    title: 'Autonomous Ops',
    description: 'Orchestrate multi-step workflows with human-in-the-loop oversight.',
    metric: '47 min saved / week',
    icon: 'sparkles',
    size: 'large'
  },
  {
    id: 2,
    title: 'Secure Execution',
    description: 'Deploy policy-aware agents across your internal systems.',
    metric: '99.99% uptime',
    icon: 'cog',
    size: 'medium'
  },
  {
    id: 3,
    title: 'Instant Insight',
    description: 'Turn signal into action with proactive recommendations.',
    metric: '4.8x faster triage',
    icon: 'chart',
    size: 'tall'
  },
  {
    id: 4,
    title: 'Model Orchestration',
    description: 'Route every task to the right model and runtime.',
    metric: '3.1s avg latency',
    icon: 'link',
    size: 'medium'
  }
];

const logos = ['Microsoft', 'NVIDIA', 'Stripe', 'OpenAI', 'AWS', 'Datadog'];

const testimonials = [
  {
    company: 'Northstar Labs',
    name: 'Maya Chen',
    role: 'VP of Operations',
    review: 'The orchestration layer feels like a force multiplier for our team.'
  },
  {
    company: 'Mosaic AI',
    name: 'Jonas Reed',
    role: 'CTO',
    review: 'Every workflow now runs with quiet confidence and measurable outcomes.'
  },
  {
    company: 'Aether Systems',
    name: 'Sofia Patel',
    role: 'Head of Product',
    review: 'We launched automations in days instead of quarters.'
  }
];

const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useIntersection({ selector: 'body', threshold: 0.1, onVisible: () => setScrolled(false), onHidden: () => setScrolled(true) });

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-black/60' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <a href="#hero" className="text-sm font-semibold tracking-[0.3em] text-white/90 uppercase">Aurelia</a>
        <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#features" className="transition hover:text-white">Platform</a>
          <a href="#pricing" className="transition hover:text-white">Pricing</a>
          <a href="#testimonials" className="transition hover:text-white">Stories</a>
        </div>
        <a href="#pricing" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10">Request access</a>
      </nav>
    </header>
  );
});

const HeroSection = memo(function HeroSection() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [flowIndex, setFlowIndex] = useState(0);
  const { ref, isVisible } = useIntersection({ threshold: 0.15 });

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setParallax({ x: x * 10, y: y * 10 });
    setFlowIndex(Math.min(3, Math.max(0, Math.round(((x + 0.5) / 1.5) * 3))));
  };

  return (
    <section id="hero" ref={ref} className="hero-shell relative flex min-h-screen items-center overflow-hidden px-6 py-24 sm:px-8 lg:px-12" onMouseMove={handleMove} onMouseLeave={() => setParallax({ x: 0, y: 0 })}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent)]" />
      <div className="hero-grid absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:60px_60px]" />
      <div className="hero-ambient absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 0, transparent 45%)' }} />
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="hero-orb hero-orb-three" />
      <div className="pointer-events-none absolute right-[3%] top-[20%] hidden h-[220px] w-[260px] rounded-[28px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl lg:block" style={{ transform: `translate(${parallax.x * 0.4}px, ${parallax.y * 0.4}px)` }}>
        <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/40">
          <span>workflow</span>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-300">live</span>
        </div>
        <div className="relative mt-6 h-[120px]">
          <div className="hero-workflow-line absolute left-2 top-6 h-[2px] w-[180px]" />
          <div className="hero-workflow-line absolute left-[48px] top-[78px] h-[2px] w-[120px] rotate-[-25deg]" />
          <div className={`hero-workflow-node absolute left-0 top-3 ${flowIndex >= 1 ? 'hero-workflow-node-active' : ''}`} />
          <div className={`hero-workflow-node absolute left-[64px] top-[72px] ${flowIndex >= 2 ? 'hero-workflow-node-active' : ''}`} />
          <div className={`hero-workflow-node absolute right-2 top-4 ${flowIndex >= 3 ? 'hero-workflow-node-active' : ''}`} />
        </div>
        <p className="mt-4 text-sm leading-6 text-white/55">Intake, route, and resolve in one continuous operating loop.</p>
      </div>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16">
        <div className={`max-w-4xl transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur">
            <AssetIcon name="arrow-trending-up" className="h-4 w-4" decorative />
            Autonomous workflows for modern teams
          </div>
          <h1 className="text-5xl font-semibold leading-[0.9] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
            Turn fragmented work into a reliable operating system.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
            Aurelia helps operations, product, and support teams route requests, automate approvals, and resolve issues without handoffs, hidden delays, or brittle scripts.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#pricing" className={`btn-sweep inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition duration-150 hover:scale-[1.02] ${motionClass.button}`}>
              Start Free <ArrowRight size={16} />
            </a>
            <a href="#dashboard" className={`btn-sweep inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition duration-150 hover:scale-[1.02] ${motionClass.button}`}>
              <Play size={16} /> Book Demo
            </a>
          </div>
        </div>
        <div className="grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div key={logo} className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium uppercase tracking-[0.3em] text-white/50">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const TrustedMarquee = memo(function TrustedMarquee() {
  return (
    <section className="border-y border-white/10 bg-black/30 py-6">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max gap-8 px-6 text-sm font-medium uppercase tracking-[0.4em] text-white/35">
          {Array.from({ length: 2 }).flatMap((_, index) => logos.map((logo) => <span key={`${logo}-${index}`} className="opacity-70 transition duration-200 hover:opacity-100">{logo}</span>))}
        </div>
      </div>
    </section>
  );
});

const FeatureCard = memo(function FeatureCard({ feature, selected, onSelect, delay }: { feature: Feature; selected: boolean; onSelect: (id: number) => void; delay: number }) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const iconName = feature.icon === 'sparkles' ? 'arrow-path' : feature.icon === 'chart' ? 'chart-pie' : feature.icon === 'cog' ? 'cog-8-tooth' : 'link-solid';

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setSpotlight({ x, y });
  };

  return (
    <article
      key={feature.id}
      onMouseEnter={() => onSelect(feature.id)}
      onFocus={() => onSelect(feature.id)}
      onMouseMove={handleMove}
      onMouseLeave={() => setSpotlight({ x: 50, y: 50 })}
      tabIndex={0}
      style={{ transitionDelay: `${delay}ms`, ['--spotlight' as string]: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.16), transparent 36%)` } as CSSProperties}
      className={`feature-card group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-left transition-all duration-200 ease-out ${selected ? 'bg-white/[0.08] shadow-glow' : 'hover:-translate-y-1 hover:bg-white/[0.06]'} ${feature.size === 'large' ? 'md:col-span-2 md:min-h-[280px]' : feature.size === 'tall' ? 'md:row-span-2' : ''}`}
    >
      <div className="absolute inset-0 opacity-0 transition duration-200 group-hover:opacity-100" style={{ background: 'var(--spotlight)' }} />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_70%)] opacity-60 transition duration-200 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="feature-icon mb-6 inline-flex rounded-full border border-white/10 bg-black/30 p-3 transition duration-200 ease-out group-hover:scale-110 group-hover:rotate-6">
            <AssetIcon name={iconName as any} className="h-5 w-5" decorative />
          </div>
          <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/60">{feature.description}</p>
        </div>
        <div className="mt-8 flex items-center justify-between text-sm text-white/70">
          <span>{feature.metric}</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </article>
  );
});

const FeatureSection = memo(function FeatureSection() {
  const [active, setActive] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(false);
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });
  const size = useResize();

  useEffect(() => {
    setIsMobile(size.width < 768);
  }, [size.width]);

  const visibleFeatures = useMemo(() => features.filter((feature) => feature.id !== 3 || !isMobile), [isMobile]);

  return (
    <section id="features" ref={ref} className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
      <div className={`mb-12 max-w-3xl transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <p className="text-sm uppercase tracking-[0.3em] text-white/45">Feature showcase</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Designed for the pace of modern teams.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleFeatures.map((feature, index) => {
          const selected = active === feature.id;
          return <FeatureCard key={feature.id} feature={feature} selected={selected} onSelect={setActive} delay={index * 80} />;
        })}
      </div>
      {!isMobile && (
        <div className="mt-4 text-sm text-white/45">Hover or focus cards to inspect the experience. Active card is preserved across layout changes.</div>
      )}
    </section>
  );
});

const DashboardSection = memo(function DashboardSection() {
  const { ref, isVisible } = useIntersection({ threshold: 0.15 });

  return (
    <section id="dashboard" ref={ref} className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
      <div className={`mb-12 flex flex-col gap-4 transition-all duration-700 md:flex-row md:items-end md:justify-between ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-white/45">Live dashboard</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Observable, measurable, and calm.</h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60">Realtime telemetry</div>
      </div>
      <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-6 shadow-glow lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-white/10 bg-black/40 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-white/45">Routing health</p>
                <p className="text-xl font-semibold text-white">95.2% efficient</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
                <AssetIcon name="chart-pie" className="h-3.5 w-3.5" decorative />
                Stable
              </div>
            </div>
            <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/35">
              <span className="dashboard-status-dot" />
              queue 18 active · throughput 1.9k req/min
            </div>
            <svg viewBox="0 0 320 180" className="h-48 w-full">
              <path d="M10 140 C50 110, 90 90, 120 100 S190 120, 220 80 S270 40, 310 60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <path className="dashboard-line" d="M10 140 C50 110, 90 90, 120 100 S190 120, 220 80 S270 40, 310 60" fill="none" stroke="#F5F5F5" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="grid gap-4">
            {[
              { label: 'Latency', value: '182ms', color: 'stroke-white' },
              { label: 'Token usage', value: '81%', color: 'stroke-white' },
              { label: 'Inference speed', value: '1.4x', color: 'stroke-white' },
              { label: 'Request volume', value: '12.8k', color: 'stroke-white' }
            ].map((item) => (
              <div key={item.label} className="rounded-[24px] border border-white/10 bg-black/30 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-white/55">{item.label}</p>
                  <div className="h-2.5 w-2.5 rounded-full bg-white/70" />
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="dashboard-bar-fill h-full rounded-full bg-white/80" style={{ ['--bar-width' as string]: `${item.label === 'Latency' ? 72 : item.label === 'Token usage' ? 81 : item.label === 'Inference speed' ? 68 : 88}%` } as CSSProperties} />
                </div>
                <p className="counter-value mt-4 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

const PricingSection = memo(function PricingSection() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const { priceMap, annualSavings } = usePricing({ currency, billing });
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });

  return (
    <section id="pricing" ref={ref} className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
      <div className={`mb-12 flex flex-col gap-6 transition-all duration-700 md:flex-row md:items-end md:justify-between ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-white/45">Pricing</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Choose a rhythm that matches your growth.</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="rounded-full border border-white/10 bg-white/5 p-1">
            {(['monthly', 'annual'] as BillingCycle[]).map((cycle) => (
              <button key={cycle} onClick={() => setBilling(cycle)} className={`rounded-full px-4 py-2 text-sm capitalize transition ${billing === cycle ? 'bg-white text-black' : 'text-white/60'}`}>
                {cycle}
              </button>
            ))}
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 p-1">
            {(['USD', 'INR', 'EUR'] as Currency[]).map((code) => (
              <button key={code} onClick={() => setCurrency(code)} className={`rounded-full px-4 py-2 text-sm transition ${currency === code ? 'bg-white text-black' : 'text-white/60'}`}>
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {(['starter', 'pro', 'enterprise'] as PlanKey[]).map((plan) => {
          const active = plan === 'pro';
          return (
            <article key={plan} className={`pricing-card rounded-[32px] border p-8 transition-all duration-300 ease-out ${active ? 'border-white/20 bg-white/[0.08] shadow-glow' : 'border-white/10 bg-white/[0.03]'}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold capitalize text-white">{plan}</h3>
                {active && <div className="pricing-badge rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">Most Popular</div>}
              </div>
              <p className="mt-4 text-sm leading-7 text-white/60">{plan === 'starter' ? 'Launch focused automations in days.' : plan === 'pro' ? 'Scale your AI operations confidently.' : 'For high-compliance, multi-team deployments.'}</p>
              <div className="mt-8">
                <PriceNode price={priceMap[plan]} billing={billing} annualSavings={annualSavings[plan]} currency={currency} />
              </div>
              <button className={`btn-sweep mt-8 w-full rounded-full border px-4 py-3 text-sm transition ${active ? 'border-white/10 bg-white text-black' : 'border-white/10 text-white hover:bg-white/5'}`}>Get started</button>
            </article>
          );
        })}
      </div>
    </section>
  );
});

const PriceNode = memo(function PriceNode({ price, billing, annualSavings, currency }: { price: number; billing: BillingCycle; annualSavings: number; currency: Currency }) {
  return (
    <div>
      <div className="flex items-end gap-2">
        <span className="text-5xl font-semibold text-white">{currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹'}{price}</span>
        <span className="pb-2 text-sm text-white/50">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
      </div>
      {billing === 'annual' && <p className="mt-3 text-sm text-emerald-300">Save {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹'}{annualSavings} annually</p>}
    </div>
  );
});

const TestimonialsSection = memo(function TestimonialsSection() {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });

  return (
    <section id="testimonials" ref={ref} className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
      <div className={`mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-white/45">Testimonials</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Trusted by operators building the next wave.</h2>
        </div>
      </div>
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
        <div className="flex animate-[marquee_30s_linear_infinite] gap-6">
          {Array.from({ length: 2 }).flatMap((_, index) => testimonials.map((item) => (
            <article key={`${item.name}-${index}`} className="w-[320px] shrink-0 rounded-[28px] border border-white/10 bg-black/30 p-6 transition hover:-translate-y-1">
              <div className="flex items-center gap-1 text-white">
                {Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} size={14} fill="currentColor" />)}
              </div>
              <p className="mt-6 text-sm leading-8 text-white/70">“{item.review}”</p>
              <div className="mt-8">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-white/45">{item.role} · {item.company}</p>
              </div>
            </article>
          )))}
        </div>
      </div>
    </section>
  );
});

const FooterSection = memo(function FooterSection() {
  return (
    <footer className="border-t border-white/10 px-6 py-12 text-sm text-white/50 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">Aurelia AI</p>
          <p>Enterprise orchestration for the next generation of products.</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="inline-flex items-center gap-2 transition hover:text-white"><AssetIcon name="link-solid" className="h-4 w-4" decorative />LinkedIn</a>
          <a href="#" className="inline-flex items-center gap-2 transition hover:text-white"><AssetIcon name="x-mark" className="h-4 w-4" decorative />X</a>
          <a href="#" className="inline-flex items-center gap-2 transition hover:text-white"><AssetIcon name="search" className="h-4 w-4" decorative />Contact</a>
        </div>
      </div>
    </footer>
  );
});

function App() {
  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />
      <main>
        <HeroSection />
        <TrustedMarquee />
        <FeatureSection />
        <DashboardSection />
        <PricingSection />
        <TestimonialsSection />
        <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
          <div className="rounded-[40px] border border-white/10 bg-white/[0.04] px-8 py-16 text-center shadow-glow sm:px-12 lg:px-20">
            <p className="text-sm uppercase tracking-[0.3em] text-white/45">Ready to deploy</p>
            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Let’s build calmer autonomous systems for your team.</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#pricing" className="btn-sweep rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]">Start free</a>
              <a href="#dashboard" className="btn-sweep rounded-full border border-white/10 bg-black/20 px-6 py-3 text-sm font-medium text-white transition hover:scale-[1.02]">See platform</a>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
