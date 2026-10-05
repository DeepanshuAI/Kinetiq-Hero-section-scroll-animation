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
  const headlineWhiteRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);
  const coreWrapperRef = useRef<HTMLDivElement>(null);
  const coreOverlayWrapperRef = useRef<HTMLDivElement>(null);
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
        headlineWhiteRef.current,
        microRef.current,
        coreWrapperRef.current,
        coreOverlayWrapperRef.current,
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

    const wordsBlack = headlineRef.current
      ? Array.from(headlineRef.current.querySelectorAll('.hero-headline-group'))
      : [];
    const wordsWhite = headlineWhiteRef.current
      ? Array.from(headlineWhiteRef.current.querySelectorAll('.hero-headline-group'))
      : [];
    const words = [...wordsBlack, ...wordsWhite];

    // Collect SVG sub-elements
    const coreBaseEl = coreWrapperRef.current;
    const coreOverlayEl = coreOverlayWrapperRef.current;
    
    // Accents are in overlay layer
    const coreAccent = coreOverlayEl?.querySelector('.core-accent-arc') as SVGPathElement | null;
    const coreAccent2 = coreOverlayEl?.querySelector('.core-accent-arc-2') as SVGPathElement | null;
    
    // Inner ring is in base layer
    const coreInnerRing = coreBaseEl?.querySelector('.core-inner-ring') as SVGCircleElement | null;

    // Collect both core wrappers
    const coreWrappers = [coreWrapperRef.current, coreOverlayWrapperRef.current].filter(Boolean) as HTMLElement[];

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
      core: coreWrappers,
      track: trackRef.current,
    });

    // ── 2. Scroll timeline (starts after intro) ──
    let scrollTl: gsap.core.Timeline | null = null;

    introTl.eventCallback('onComplete', () => {
      scrollTl = createHeroTimeline({
        heroSection: heroSectionRef.current,
        pinWrapper: pinWrapperRef.current,
        core: coreWrappers,
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
      <div ref={bgRef} className="hero-bg-layer">
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

          {/* Kinetic Core Base */}
          <div
            ref={coreWrapperRef}
            className="kinetic-core-container"
            style={{ zIndex: 10 }}
          >
            <KineticCore layer="base" />
          </div>

          {/* Headline (Dual layered for intersection effect) */}
          <div className="hero-headline-wrapper">
            <HeroHeadline ref={headlineRef} className="headline-black" />
            <HeroHeadline ref={headlineWhiteRef} className="headline-white" aria-hidden="true" />
          </div>

          {/* Kinetic Core Overlay */}
          <div
            ref={coreOverlayWrapperRef}
            className="kinetic-core-container"
            style={{ zIndex: 25, pointerEvents: 'none' }}
          >
            <KineticCore layer="overlay" />
          </div>

          {/* Micro copy */}
          <div
            ref={microRef}
            className="hero-micro-container"
          >
            Creative technology / Interaction / Digital experiences
          </div>

          {/* Metric Cards */}
          <MetricCard
            ref={setMetricRef(0)}
            data={METRICS[0]}
            className="metric-pos-0"
          />
          <MetricCard
            ref={setMetricRef(1)}
            data={METRICS[1]}
            className="metric-pos-1"
          />
          <MetricCard
            ref={setMetricRef(2)}
            data={METRICS[2]}
            className="metric-pos-2"
          />
          <MetricCard
            ref={setMetricRef(3)}
            data={METRICS[3]}
            className="metric-pos-3"
          />

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
