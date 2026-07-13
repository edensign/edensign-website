/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AppDownload = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="es-app-download-section">
      <div className="es-app-download-panel">
        {/* Glow blobs inside panel */}
        <div
          className="es-hero-blob"
          style={{
            width: '500px',
            height: '500px',
            background: 'rgba(244, 201, 196, 0.15)',
            top: '-200px',
            right: '-150px',
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="es-hero-blob"
          style={{
            width: '500px',
            height: '500px',
            background: 'rgba(15, 93, 78, 0.25)',
            bottom: '-250px',
            left: '-150px',
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />

        <div className="es-app-download-panel-grid">
          {/* Left Column: Info & Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="es-eyebrow" style={{ color: 'var(--es-blush)' }}>
              The pocket sanctuary
            </span>
            <h2 className="es-section-title" style={{ color: '#fff', fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Carry Eden with you.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'rgba(255, 255, 255, 0.70)', lineHeight: '1.7', marginTop: '16px' }}>
              Instant booking, member rewards, AI concierge, salon offers, and the marketplace —
              in one quietly elegant app.
            </p>

            <div className="es-app-btn-row">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="es-app-btn es-app-btn-solid"
              >
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '20px', fontWeight: 500 }}>iOS</span> Download on App Store
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="es-app-btn es-app-btn-outline"
              >
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '20px', fontWeight: 500 }}>Android</span> Get on Google Play
              </a>
            </div>
          </motion.div>

          {/* Right Column: Phone Mockup */}
          <motion.div
            className="es-app-phone-mockup"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          >
            <div className="es-app-phone-container">
              <div className="es-app-phone-screen">
                <span className="es-app-phone-logo">Eden</span>
              </div>
            </div>

            {/* Floating Card */}
            <div className="es-app-floating-card es-animate-float">
              <span className="es-app-float-badge">Appointment</span>
              <p className="es-app-float-title">Thu 6:30 PM · Elena V.</p>
              <p className="es-app-float-sub">Aurelia Studio, Manhattan</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
