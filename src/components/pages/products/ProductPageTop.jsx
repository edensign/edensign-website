/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';

function ProductPageTop() {
  return (
    <div style={{
      width: '100%',
      background: 'var(--es-background)',
      padding: '120px 24px 20px 24px',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '800px',
        width: '100%',
      }}>
        {/* Subtitle / Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '11px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--es-primary)',
            marginBottom: '12px',
          }}
        >
          Curated Luxury Curation
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 600,
            color: 'var(--es-espresso)',
            margin: '0 0 16px',
            lineHeight: 1.1,
          }}
        >
          The <span style={{ fontStyle: 'italic', fontWeight: '400' }}>Boutique</span>
        </motion.h1>

        {/* Tagline description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: 'var(--es-on-surface-variant)',
            lineHeight: '1.7',
            maxWidth: '650px',
            margin: '0 auto',
            fontStyle: 'italic',
            fontWeight: 300,
          }}
        >
          Curated luxury essentials for the modern beauty artisan. Every product is vetted for professional excellence and sensory delight.
        </motion.p>

        <div style={{
          width: '48px',
          height: '2px',
          background: 'var(--es-rose-gold)',
          margin: '24px auto 0',
        }} />
      </div>
    </div>
  );
}

export default ProductPageTop;