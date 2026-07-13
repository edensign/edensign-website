/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const tips = [
  {
    kind: "Hair",
    title: "The quiet science of a scalp reset ritual",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop",
  },
  {
    kind: "Skin",
    title: "Why your barrier craves ceramides after 25",
    img: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400&auto=format&fit=crop",
  },
  {
    kind: "Nails",
    title: "A season of soft nudes, sculpted by hand",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop",
  },
];

const BeautyTips = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="es-beauty-tips-section" id="tips">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Row */}
        <motion.div
          className="es-ecosystem-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div className="es-ecosystem-header-inner">
            <span className="es-eyebrow">The Journal</span>
            <h2 className="es-section-title" style={{ marginBottom: 0 }}>
              Rituals, science, and stories <em>from the world of beauty.</em>
            </h2>
          </div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--es-charcoal)',
              borderBottom: '1px solid rgba(26, 21, 18, 0.2)',
              paddingBottom: '4px',
              textDecoration: 'none',
              transition: 'color 0.25s, border-color 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--es-emerald)';
              e.currentTarget.style.borderColor = 'var(--es-emerald)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--es-charcoal)';
              e.currentTarget.style.borderColor = 'rgba(26, 21, 18, 0.2)';
            }}
          >
            Read all essays <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </a>
        </motion.div>

        {/* Tips Grid */}
        <div className="es-tips-grid">
          {tips.map((t, i) => (
            <motion.article
              key={t.title}
              className="es-tip-article"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.15, ease: 'easeOut' }}
            >
              <div className="es-tip-img-wrap">
                <img src={t.img} alt={t.title} className="es-tip-img" loading="lazy" />
              </div>
              <p className="es-tip-meta">{t.kind} · 6 min read</p>
              <h3 className="es-tip-title">{t.title}</h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeautyTips;
