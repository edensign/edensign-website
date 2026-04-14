/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
            src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/makeup/skincare-closeup.jpg"
            alt="Find your dream job"
            className="es-split-img"
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
        <h2 className="es-section-title">Find Your <em>Dream Job</em></h2>
        <div className="es-title-divider" style={{ marginBottom: '24px' }} />
        <p className="es-split-body">
          Not only can you discover top-rated salons, explore services, and book appointments instantly,
          but we also provide an online platform for salon employees to apply for jobs and connect with
          their dream salons.
        </p>
        <p className="es-split-body">
          Whether you're a client looking for exceptional service or a professional seeking exciting
          opportunities — we've got you covered.
        </p>
        <a href="/job-seeker" className="es-btn-primary" style={{ marginTop: '12px', display: 'inline-block' }}>
          Explore Jobs
        </a>
      </motion.div>
    </section>
  );
};

export default ImageContainer;
