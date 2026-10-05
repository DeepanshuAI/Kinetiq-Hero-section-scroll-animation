import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface HeroTimelineRefs {
  heroSection: HTMLElement | null;
  pinWrapper: HTMLElement | null;
  core: HTMLElement | null;
  coreAccent: SVGPathElement | null;
  coreAccent2: SVGPathElement | null;
  coreInnerRing: SVGCircleElement | null;
  headline: HTMLElement | null;
  words: HTMLElement[];
  micro: HTMLElement | null;
  metrics: HTMLElement[];
  track: HTMLElement | null;
  scrollIndicator: HTMLElement | null;
  bgElement: HTMLElement | null;
}

/**
 * Creates the master scroll-driven timeline for the hero section.
 * 
 * The timeline is organized into scenes:
 * 0.00–0.10: Quiet intro → scroll indicator fades
 * 0.10–0.35: Core activation — translates, rotates, scales
 * 0.35–0.55: Core crosses headline — typography becomes prominent
 * 0.55–0.70: Headline expansion + background darkens
 * 0.70–1.00: Metrics reveal progressively
 */
export function createHeroTimeline(refs: HeroTimelineRefs): gsap.core.Timeline | null {
  if (!refs.heroSection || !refs.pinWrapper) return null;

  // Detect mobile
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  // Responsive motion values
  const coreStartX = isMobile ? '-20vw' : '-30vw';
  const coreMidX = isMobile ? '0vw' : '5vw';
  const coreEndX = isMobile ? '15vw' : '30vw';
  const coreStartRotation = -12;
  const coreMidRotation = 3;
  const coreEndRotation = 15;

  const master = gsap.timeline({
    scrollTrigger: {
      trigger: refs.heroSection,
      start: 'top top',
      end: '+=250%',
      scrub: 0.8,
      pin: refs.pinWrapper,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // ── SCENE 0: Scroll indicator fade (0.00 → 0.08) ──
  if (refs.scrollIndicator) {
    master.to(
      refs.scrollIndicator,
      {
        opacity: 0,
        y: -10,
        duration: 0.08,
        ease: 'power2.in',
      },
      0
    );
  }

  // ── SCENE 1: Core activation (0.05 → 0.35) ──
  if (refs.core) {
    // Phase 1: Core moves from left toward center
    master.fromTo(
      refs.core,
      {
        x: coreStartX,
        rotation: coreStartRotation,
        scale: 0.8,
      },
      {
        x: coreMidX,
        rotation: coreMidRotation,
        scale: 1.05,
        duration: 0.30,
        ease: 'power1.inOut',
      },
      0.05
    );
  }

  // Accent arc counter-rotation for mechanical feel
  if (refs.coreAccent) {
    master.to(
      refs.coreAccent,
      {
        rotation: -60,
        transformOrigin: '200px 200px',
        duration: 0.30,
        ease: 'power1.inOut',
      },
      0.05
    );
  }

  if (refs.coreAccent2) {
    master.to(
      refs.coreAccent2,
      {
        rotation: 45,
        transformOrigin: '200px 200px',
        duration: 0.30,
        ease: 'power1.inOut',
      },
      0.05
    );
  }

  // Inner ring slow rotation
  if (refs.coreInnerRing) {
    master.to(
      refs.coreInnerRing,
      {
        rotation: 90,
        transformOrigin: '200px 200px',
        duration: 0.85,
        ease: 'none',
      },
      0.05
    );
  }

  // ── SCENE 2: Core crosses headline (0.35 → 0.55) ──
  // Headline becomes more visible and shifts
  if (refs.words.length > 0) {
    master.to(
      refs.words,
      {
        scale: 1.02,
        duration: 0.20,
        stagger: 0.02,
        ease: 'power2.out',
      },
      0.35
    );
  }

  // Core continues moving past center
  if (refs.core) {
    master.to(
      refs.core,
      {
        x: coreEndX,
        rotation: coreEndRotation,
        scale: isMobile ? 0.7 : 0.85,
        duration: 0.35,
        ease: 'power1.inOut',
      },
      0.35
    );
  }

  if (refs.coreAccent) {
    master.to(
      refs.coreAccent,
      {
        rotation: -180,
        transformOrigin: '200px 200px',
        duration: 0.55,
        ease: 'power1.inOut',
      },
      0.35
    );
  }

  // ── SCENE 3: Background darkens + headline expansion (0.50 → 0.70) ──
  if (refs.bgElement) {
    master.to(
      refs.bgElement,
      {
        backgroundColor: '#1A1A1A',
        color: '#F5F2EE',
        duration: 0.20,
        ease: 'power2.inOut',
      },
      0.50
    );
  }

  // Track line inverts
  if (refs.track) {
    master.to(
      refs.track,
      {
        opacity: 0.08,
        duration: 0.15,
      },
      0.50
    );
  }

  // Headline words slight horizontal shift
  if (refs.words.length > 0) {
    refs.words.forEach((word, i) => {
      const direction = i % 2 === 0 ? -8 : 8;
      master.to(
        word,
        {
          x: direction,
          duration: 0.15,
          ease: 'power2.out',
        },
        0.55 + i * 0.015
      );
    });
  }

  // Micro copy color transition
  if (refs.micro) {
    master.to(
      refs.micro,
      {
        color: '#999999',
        duration: 0.15,
      },
      0.55
    );
  }

  // ── SCENE 4: Metrics reveal (0.70 → 1.00) ──
  if (refs.metrics.length > 0) {
    const metricDuration = 0.06;
    const metricGap = 0.075;

    refs.metrics.forEach((metric, i) => {
      const startTime = 0.70 + i * metricGap;

      master.fromTo(
        metric,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: metricDuration,
          ease: 'power3.out',
        },
        startTime
      );
    });
  }

  return master;
}

/**
 * Kills all ScrollTrigger instances related to the hero.
 */
export function destroyHeroTimeline(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
