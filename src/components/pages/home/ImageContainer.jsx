/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import salonJobImg from "../../assets/salon_job.png";

const ImageContainer = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="es-split-section">
      <motion.div
        className="es-split-img-side"
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      >
        <div className="es-split-img-frame">
          <img
            src={salonJobImg}
            alt="Find your dream job"
            className="es-split-img"
            loading="lazy"
            decoding="async"
          />
          <div className="es-split-img-accent" />
        </div>
      </motion.div>

      <motion.div
        className="es-split-text-side"
        initial={{ opacity: 0, x: 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.15, ease: 'easeOut' }}
      >
        <span className="es-eyebrow">Career Opportunities</span>
        <h2 className="es-section-title">
          Find Your <em>Dream Job</em>
        </h2>
        <div className="es-title-divider" style={{ marginBottom: '28px' }} />

        <p className="es-split-body">
          Not only can you discover top-rated salons, explore services, and book appointments instantly,
          but we also provide an online platform for salon employees to apply for jobs and connect with
          their dream salons.
        </p>
        <p className="es-split-body">
          Whether you're a client looking for exceptional service or a professional seeking exciting
          opportunities — we've got you covered.
        </p>

        <a
          href="/job-seeker"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 36px',
            background: 'var(--es-espresso)',
            color: '#ffffff',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '100px',
            marginTop: '12px',
            transition: 'background 0.3s ease, transform 0.25s ease, box-shadow 0.3s ease',
            boxShadow: '0 6px 24px rgba(26, 10, 0, 0.16)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--es-rose-gold)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(199, 149, 108, 0.28)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--es-espresso)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(26, 10, 0, 0.16)';
          }}
        >
          Explore Jobs →
        </a>
      </motion.div>
    </section>
  );
};

export default ImageContainer;
