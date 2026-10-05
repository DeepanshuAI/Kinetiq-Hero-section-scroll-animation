'use client';

import React, { forwardRef } from 'react';

interface HeroBrandProps {
  className?: string;
}

const HeroBrand = forwardRef<HTMLDivElement, HeroBrandProps>(
  ({ className = '' }, ref) => {
    return (
      <div ref={ref} className={`hero-brand ${className}`}>
        <span>Kinetiq</span>
      </div>
    );
  }
);

HeroBrand.displayName = 'HeroBrand';

export default HeroBrand;
