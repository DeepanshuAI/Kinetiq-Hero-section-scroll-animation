'use client';

import React from 'react';

interface KineticCoreProps {
  className?: string;
}

const KineticCore: React.FC<KineticCoreProps> = ({ className = '' }) => {
  return (
    <div className={`kinetic-core-wrapper ${className}`}>
      <svg
        className="kinetic-core-svg"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
      >
        <defs>
          {/* Metallic gradient for outer ring */}
          <linearGradient id="metallic-outer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B0B0B0" />
            <stop offset="30%" stopColor="#8A8A8A" />
            <stop offset="60%" stopColor="#5A5A5A" />
            <stop offset="100%" stopColor="#3A3A3A" />
          </linearGradient>

          {/* Inner ring gradient */}
          <linearGradient id="metallic-inner" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6A6A6A" />
            <stop offset="50%" stopColor="#3A3A3A" />
            <stop offset="100%" stopColor="#5A5A5A" />
          </linearGradient>

          {/* Core disk radial gradient */}
          <radialGradient id="core-disk" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="70%" stopColor="#1A1A1A" />
            <stop offset="100%" stopColor="#111111" />
          </radialGradient>

          {/* Shadow filter */}
          <filter id="core-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000000" floodOpacity="0.25" />
          </filter>

          {/* Subtle inner glow */}
          <filter id="inner-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feFlood floodColor="#C8FF00" floodOpacity="0.15" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Drop shadow layer */}
        <g filter="url(#core-shadow)">
          <circle cx="200" cy="200" r="160" fill="transparent" />
        </g>

        {/* Outer dashed ring — mechanical gauge aesthetic */}
        <circle
          className="core-outer-dashed"
          cx="200"
          cy="200"
          r="185"
          fill="none"
          stroke="#8A8A8A"
          strokeWidth="0.5"
          strokeDasharray="4 8"
          opacity="0.4"
        />

        {/* Tick marks around outer ring */}
        <g className="core-ticks" opacity="0.3">
          {Array.from({ length: 72 }).map((_, i) => {
            const angle = (i * 5 * Math.PI) / 180;
            const isLong = i % 9 === 0;
            const r1 = isLong ? 168 : 173;
            const r2 = 180;
            return (
              <line
                key={`tick-${i}`}
                x1={200 + r1 * Math.cos(angle)}
                y1={200 + r1 * Math.sin(angle)}
                x2={200 + r2 * Math.cos(angle)}
                y2={200 + r2 * Math.sin(angle)}
                stroke="#8A8A8A"
                strokeWidth={isLong ? '1' : '0.5'}
              />
            );
          })}
        </g>

        {/* Outer solid ring — metallic */}
        <circle
          className="core-outer-ring"
          cx="200"
          cy="200"
          r="155"
          fill="none"
          stroke="url(#metallic-outer)"
          strokeWidth="8"
        />

        {/* Secondary ring */}
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="#5A5A5A"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Inner metallic ring */}
        <circle
          className="core-inner-ring"
          cx="200"
          cy="200"
          r="125"
          fill="none"
          stroke="url(#metallic-inner)"
          strokeWidth="12"
        />

        {/* Core disk — dark graphite center */}
        <circle
          className="core-disk"
          cx="200"
          cy="200"
          r="110"
          fill="url(#core-disk)"
        />

        {/* Radial precision lines on core */}
        <g className="core-radials" opacity="0.15">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            return (
              <line
                key={`radial-${i}`}
                x1={200 + 40 * Math.cos(angle)}
                y1={200 + 40 * Math.sin(angle)}
                x2={200 + 105 * Math.cos(angle)}
                y2={200 + 105 * Math.sin(angle)}
                stroke="#8A8A8A"
                strokeWidth="0.5"
              />
            );
          })}
        </g>

        {/* Inner detail ring */}
        <circle
          cx="200"
          cy="200"
          r="70"
          fill="none"
          stroke="#5A5A5A"
          strokeWidth="0.75"
          opacity="0.25"
        />

        {/* Core center point */}
        <circle
          cx="200"
          cy="200"
          r="35"
          fill="#1A1A1A"
          stroke="#3A3A3A"
          strokeWidth="1.5"
        />

        {/* Cross-hair horizontal */}
        <line
          x1="140"
          y1="200"
          x2="260"
          y2="200"
          stroke="#5A5A5A"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* Cross-hair vertical */}
        <line
          x1="200"
          y1="140"
          x2="200"
          y2="260"
          stroke="#5A5A5A"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* Accent arc — electric chartreuse */}
        <path
          className="core-accent-arc"
          d="M 200 15 A 185 185 0 0 1 385 200"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Secondary accent arc */}
        <path
          className="core-accent-arc-2"
          d="M 200 385 A 185 185 0 0 1 15 200"
          fill="none"
          stroke="#C8FF00"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Center dot */}
        <circle
          cx="200"
          cy="200"
          r="4"
          fill="#C8FF00"
          opacity="0.9"
        />

        {/* Small indicator marks at cardinal points */}
        <g opacity="0.5">
          <rect x="197" y="8" width="6" height="2" rx="1" fill="#C8FF00" />
          <rect x="197" y="390" width="6" height="2" rx="1" fill="#C8FF00" />
          <rect x="8" y="199" width="2" height="6" rx="1" fill="#C8FF00" opacity="0.4" />
          <rect x="390" y="199" width="2" height="6" rx="1" fill="#C8FF00" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
};

export default KineticCore;
