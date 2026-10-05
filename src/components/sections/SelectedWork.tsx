'use client';

import React from 'react';

interface ProjectCard {
  title: string;
  category: string;
  year: string;
}

const PROJECTS: ProjectCard[] = [
  {
    title: 'Meridian',
    category: 'Interactive Installation',
    year: '2024',
  },
  {
    title: 'Pulse',
    category: 'Digital Product',
    year: '2024',
  },
  {
    title: 'Terraform',
    category: 'Brand Experience',
    year: '2023',
  },
];

const SelectedWork: React.FC = () => {
  return (
    <section id="work" className="selected-work" aria-label="Selected Work">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '4rem' }}>
          <p
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.4,
              marginBottom: '1rem',
              fontFamily: 'var(--font-primary)',
            }}
          >
            Selected Work
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              fontFamily: 'var(--font-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Recent Projects
          </h2>
        </div>

        {/* Project grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {PROJECTS.map((project) => (
            <article key={project.title} className="work-card">
              <div className="work-card-image">
                {/* Geometric placeholder pattern */}
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 250"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <rect width="400" height="250" fill="#1e1e1e" />
                  <circle
                    cx="200"
                    cy="125"
                    r="60"
                    fill="none"
                    stroke="#333"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="200"
                    cy="125"
                    r="30"
                    fill="none"
                    stroke="#333"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="140"
                    y1="125"
                    x2="260"
                    y2="125"
                    stroke="#333"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="200"
                    y1="65"
                    x2="200"
                    y2="185"
                    stroke="#333"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
              <div className="work-card-content">
                <h3 className="work-card-title">{project.title}</h3>
                <p className="work-card-desc">
                  {project.category} — {project.year}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
