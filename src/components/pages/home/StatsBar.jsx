/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const stats = [
  { value: 500, suffix: '+', label: 'Salons Listed' },
  { value: 10000, suffix: '+', label: 'Happy Clients' },
  { value: 50, suffix: '+', label: 'Cities Covered' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

const StatsBar = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="es-stats-bar">
      <div className="es-stats-inner">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="es-stat-item"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
          >
            <span className="es-stat-number">
              {inView ? (
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  suffix={stat.suffix}
                />
              ) : '0' + stat.suffix}
            </span>
            <span className="es-stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
