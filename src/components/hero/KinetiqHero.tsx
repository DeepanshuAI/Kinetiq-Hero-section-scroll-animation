'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import KineticCore from './KineticCore';
import HeroHeadline from './HeroHeadline';
import HeroBrand from './HeroBrand';
import MetricCard, { MetricData } from './MetricCard';
import { createIntroAnimation } from '@/lib/animations/introAnimation';
import { createHeroTimeline, destroyHeroTimeline } from '@/lib/animations/heroTimeline';

gsap.registerPlugin(ScrollTrigger);

const METRICS: MetricData[] = [
  { value: '72%', label: 'Faster Prototype Cycles', index: '01', total: '04' },
  { value: '41%', label: 'Higher Engagement', index: '02', total: '04' },
  { value: '86%', label: 'Projects Shipped On Time', index: '03', total: '04' },
  { value: '93%', label: 'Client Retention', index: '04', total: '04' },
];

const KinetiqHero: React.FC = () => {
  // Refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);
  const coreWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const metricRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  const setMetricRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      metricRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Show everything immediately without animation
      const allElements = [
        brandRef.current,
        headlineRef.current,
        microRef.current,
        coreWrapperRef.current,
        trackRef.current,
        scrollIndicatorRef.current,
        ...metricRefs.current,
      ].filter(Boolean);

      allElements.forEach((el) => {
        if (el) {
          gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1, filter: 'none' });
        }
      });

      return;
    }

    // Collect word elements
    const words = headlineRef.current
      ? Array.from(headlineRef.current.querySelectorAll('.hero-headline-word'))
      : [];

    // Collect SVG sub-elements
    const coreEl = coreWrapperRef.current;
    const coreAccent = coreEl?.querySelector('.core-accent-arc') as SVGPathElement | null;
    const coreAccent2 = coreEl?.querySelector('.core-accent-arc-2') as SVGPathElement | null;
    const coreInnerRing = coreEl?.querySelector('.core-inner-ring') as SVGCircleElement | null;

    // Set initial metric state
    metricRefs.current.forEach((metric) => {
      if (metric) {
        gsap.set(metric, { opacity: 0, y: 30, scale: 0.95 });
      }
    });

    // ── 1. Intro animation ──
    const introTl = createIntroAnimation({
      brand: brandRef.current,
      headline: headlineRef.current,
      words: words as HTMLElement[],
      micro: microRef.current,
      scrollIndicator: scrollIndicatorRef.current,
      core: coreWrapperRef.current,
      track: trackRef.current,
    });

    // ── 2. Scroll timeline (starts after intro) ──
    let scrollTl: gsap.core.Timeline | null = null;

    introTl.eventCallback('onComplete', () => {
      scrollTl = createHeroTimeline({
        heroSection: heroSectionRef.current,
        pinWrapper: pinWrapperRef.current,
        core: coreWrapperRef.current,
        coreAccent,
        coreAccent2,
        coreInnerRing,
        headline: headlineRef.current,
        words: words as HTMLElement[],
        micro: microRef.current,
        metrics: metricRefs.current.filter(Boolean) as HTMLElement[],
        track: trackRef.current,
        scrollIndicator: scrollIndicatorRef.current,
        bgElement: bgRef.current,
      });
    });

    // Cleanup
    return () => {
      introTl.kill();
      if (scrollTl) scrollTl.kill();
      destroyHeroTimeline();
    };
  }, []);

  return (
    <section ref={heroSectionRef} className="hero-section" aria-label="Hero">
      <div ref={bgRef} className="hero-section" style={{ position: 'relative' }}>
        <div ref={pinWrapperRef} className="hero-content">
          {/* Brand */}
          <HeroBrand ref={brandRef} />

          {/* Navigation */}
          <nav className="hero-nav" aria-label="Main navigation">
            <a href="#work" className="hero-nav-link">Work</a>
            <a href="#about" className="hero-nav-link">Studio</a>
            <a href="#contact" className="hero-nav-link">Contact</a>
          </nav>

          {/* Horizontal track line */}
          <div ref={trackRef} className="hero-track" />

          {/* Kinetic Core */}
          <div
            ref={coreWrapperRef}
            style={{
              position: 'absolute',
              width: 'clamp(220px, 30vw, 420px)',
              height: 'clamp(220px, 30vw, 420px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          >
            <KineticCore />
          </div>

          {/* Headline */}
          <HeroHeadline ref={headlineRef} />

          {/* Micro copy */}
          <div
            ref={microRef}
            className="hero-micro"
            style={{
              position: 'absolute',
              bottom: 'clamp(4rem, 8vh, 6rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Creative technology / Interaction / Digital experiences
          </div>

          {/* Metric Cards — positioned around the core */}
          {METRICS.map((metric, i) => {
            // Position metrics in quadrants around center
            const positions = [
              // Top-left
              {
                top: 'clamp(15%, 20%, 25%)',
                left: 'clamp(4%, 8%, 12%)',
              },
              // Top-right
              {
                top: 'clamp(15%, 20%, 25%)',
                right: 'clamp(4%, 8%, 12%)',
              },
              // Bottom-left
              {
                bottom: 'clamp(18%, 22%, 28%)',
                left: 'clamp(4%, 8%, 12%)',
              },
              // Bottom-right
              {
                bottom: 'clamp(18%, 22%, 28%)',
                right: 'clamp(4%, 8%, 12%)',
              },
            ];

            return (
              <MetricCard
                key={metric.index}
                ref={setMetricRef(i)}
                data={metric}
                className={`metric-pos-${i}`}
                isDark={false}
              />
            );
          })}

          {/* Scroll indicator */}
          <div ref={scrollIndicatorRef} className="scroll-indicator">
            <span className="scroll-indicator-text">Scroll</span>
            <div className="scroll-indicator-line" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KinetiqHero;
