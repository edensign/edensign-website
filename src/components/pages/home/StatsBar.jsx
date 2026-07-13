/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: 500,  suffix: '+',  label: 'Luxury Salons' },
  { value: 10,   suffix: 'k+', label: 'Master Stylists' },
  { value: 45,   suffix: 'k',  label: 'Active Members' },
  { value: 12,   suffix: '',   label: 'Global Cities' },
  { value: 180,  suffix: '+',  label: 'Partner Brands' },
  { value: 24,   suffix: 'M',  label: 'Appointments' },
];

// Double the array so the marquee loops seamlessly
const doubled = [...stats, ...stats];

const StatsBar = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="es-stats-bar">
      <div className="es-stats-marquee-track">
        {doubled.map((stat, i) => (
          <div key={i} className="es-stats-marquee-item">
            <span className="es-stats-marquee-number">
              {inView ? (
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  suffix={stat.suffix}
                  /* Only animate the first set (i < stats.length) to avoid double-trigger */
                  start={i >= stats.length ? stat.value : undefined}
                />
              ) : (
                `0${stat.suffix}`
              )}
            </span>
            <span className="es-stats-marquee-label">{stat.label}</span>
            <span className="es-stats-marquee-sep" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
