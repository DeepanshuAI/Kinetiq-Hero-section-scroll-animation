'use client';

import React, { forwardRef } from 'react';

export interface MetricData {
  value: string;
  label: string;
  index: string;
  total: string;
}

interface MetricCardProps {
  data: MetricData;
  className?: string;
  isDark?: boolean;
}

const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ data, className = '', isDark = false }, ref) => {
    return (
      <div ref={ref} className={`metric-card ${isDark ? 'dark' : ''} ${className}`}>
        <div className="metric-card-inner">
          <div className="metric-number">{data.value}</div>
          <div className="metric-label">{data.label}</div>
          <div className="metric-index">
            {data.index} / {data.total}
          </div>
        </div>
      </div>
    );
  }
);

MetricCard.displayName = 'MetricCard';

export default MetricCard;
