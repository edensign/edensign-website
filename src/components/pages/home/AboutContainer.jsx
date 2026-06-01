/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutContainer = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="es-split-section es-about-section">
      <motion.div
        className="es-split-text-side"
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      >
        <span className="es-eyebrow">Our Story</span>
        <h2 className="es-section-title">About <em>Us</em></h2>
        <div className="es-title-divider" style={{ marginBottom: '24px' }} />
        <p className="es-split-body">
          Your ultimate destination for effortless salon appointment bookings! We bridge the gap between
          clients and salons, making beauty and grooming services accessible with just a few clicks.
          Whether you're looking for a haircut, spa treatment, or a complete makeover, we've got you covered.
        </p>
        <p className="es-split-body">
          Our user-friendly platform helps you discover top-rated salons, view their services, check
          availability, and book your appointment instantly. Designed with convenience in mind, Eden Sign
          ensures a seamless experience for both clients and salon professionals.
        </p>
        <p className="es-split-tagline">
          Join us in revolutionizing the way you book salon appointments — because your time and beauty matter.
        </p>
        <a href="/about" className="es-btn-primary" style={{ marginTop: '12px', display: 'inline-block' }}>
          Read More
        </a>
      </motion.div>

      <motion.div
        className="es-split-img-side"
        initial={{ opacity: 0, x: 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.15, ease: 'easeOut' }}
      >
        <div className="es-split-img-frame es-about-frame">
          <img
            src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/services/keratin.jpg"
            alt="About Eden Sign"
            className="es-split-img"
            loading="lazy"
            decoding="async"
          />
          <div className="es-split-img-accent es-about-accent" />
        </div>
      </motion.div>
    </section>
  );
};

export default AboutContainer;
