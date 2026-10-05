'use client';

import React, { forwardRef } from 'react';

interface HeroHeadlineProps {
  className?: string;
}

const HeroHeadline = forwardRef<HTMLDivElement, HeroHeadlineProps>(
  ({ className = '' }, ref) => {
    return (
      <div ref={ref} className={`hero-headline ${className}`}>
        <h1>
          <span className="line" aria-label="We build">
            <span className="hero-headline-word" data-word="we">We</span>{' '}
            <span className="hero-headline-word" data-word="build">Build</span>
          </span>
          <span className="line" aria-label="things that move">
            <span className="hero-headline-word" data-word="things">Things</span>{' '}
            <span className="hero-headline-word" data-word="that">That</span>{' '}
            <span className="hero-headline-word" data-word="move">Move</span>
          </span>
        </h1>
      </div>
    );
  }
);

HeroHeadline.displayName = 'HeroHeadline';

export default HeroHeadline;
