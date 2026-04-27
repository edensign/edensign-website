/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import newsletterImg from '../assets/newsletter.jpg';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <section ref={ref} className="es-newsletter-section">
      <div className="es-newsletter-bg" style={{ backgroundImage: `url(${newsletterImg})` }} />
      <div className="es-newsletter-overlay" />

      <motion.div
        className="es-newsletter-content"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="es-newsletter-icon-wrap">
          <MarkEmailReadOutlinedIcon sx={{ fontSize: 48, color: '#c7956c' }} />
        </div>
        <span className="es-eyebrow" style={{ color: '#c7956c' }}>Stay In The Loop</span>
        <h2 className="es-section-title" style={{ color: '#fff', marginBottom: '8px' }}>
          Get <em>Latest</em> Updates
        </h2>
        <p className="es-newsletter-subtext">
          Subscribe to get exclusive offers, beauty tips, and the latest news from Eden Sign.
        </p>

        <form className="es-newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            className="es-newsletter-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            id="newsletter-email"
          />
          <button type="submit" className="es-newsletter-btn">
            Subscribe
          </button>
        </form>

        <p className="es-newsletter-note">No spam, unsubscribe at any time.</p>
      </motion.div>
    </section>
  );
};

export default Newsletter;
