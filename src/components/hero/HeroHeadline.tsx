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
            <span className="hero-headline-group" data-group="we-build">WE BUILD</span>
          </span>
          <span className="line line-flex" aria-label="things that move">
            <span className="hero-headline-wrapper" style={{ overflow: 'hidden', display: 'inline-block' }}>
              <span className="hero-headline-group" data-group="things">THINGS</span>
            </span>
            <span className="hero-headline-wrapper" style={{ overflow: 'hidden', display: 'inline-block' }}>
              <span className="hero-headline-group" data-group="that-move">THAT MOVE</span>
            </span>
          </span>
        </h1>
      </div>
    );
  }
);

HeroHeadline.displayName = 'HeroHeadline';

export default HeroHeadline;
