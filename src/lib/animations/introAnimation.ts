import { gsap } from 'gsap';

/**
 * Creates the page-load intro animation sequence.
 * Runs once on mount, before scroll interaction begins.
 */
export function createIntroAnimation(refs: {
  brand: HTMLElement | null;
  headline: HTMLElement | null;
  words: HTMLElement[];
  micro: HTMLElement | null;
  scrollIndicator: HTMLElement | null;
  core: HTMLElement | null;
  track: HTMLElement | null;
}): gsap.core.Timeline {
  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out',
    },
  });

  // Initial states — set before animation
  if (refs.brand) {
    gsap.set(refs.brand, { opacity: 0, y: 12, filter: 'blur(4px)' });
  }
  if (refs.words.length > 0) {
    gsap.set(refs.words, { opacity: 0, y: 24, filter: 'blur(6px)' });
  }
  if (refs.micro) {
    gsap.set(refs.micro, { opacity: 0, y: 10 });
  }
  if (refs.scrollIndicator) {
    gsap.set(refs.scrollIndicator, { opacity: 0, y: 8 });
  }
  if (refs.core) {
    gsap.set(refs.core, { opacity: 0, scale: 0.9 });
  }
  if (refs.track) {
    gsap.set(refs.track, { scaleX: 0, transformOrigin: 'center' });
  }

  // Brand reveal
  if (refs.brand) {
    tl.to(refs.brand, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
    });
  }

  // Track line expand
  if (refs.track) {
    tl.to(
      refs.track,
      {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.inOut',
      },
      '-=0.4'
    );
  }

  // Core reveal
  if (refs.core) {
    tl.to(
      refs.core,
      {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power2.out',
      },
      '-=0.3'
    );
  }

  // Headline words stagger
  if (refs.words.length > 0) {
    tl.to(
      refs.words,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      },
      '-=0.5'
    );
  }

  // Micro copy
  if (refs.micro) {
    tl.to(
      refs.micro,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      '-=0.2'
    );
  }

  // Scroll indicator
  if (refs.scrollIndicator) {
    tl.to(
      refs.scrollIndicator,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
      },
      '-=0.1'
    );
  }

  return tl;
}
