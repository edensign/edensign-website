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
      <motion.div
        className="es-newsletter-content"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span className="es-eyebrow" style={{ color: 'var(--es-primary)', letterSpacing: '0.2em', marginBottom: '16px' }}>The Boutique</span>
        <h2 className="es-section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '600', marginBottom: '16px' }}>
          The Eden <span style={{ fontStyle: 'italic', fontWeight: '400' }}>Journal</span>
        </h2>
        <p className="es-newsletter-subtext">
          Receive a weekly curation of beauty trends, insider interviews, and exclusive salon offers directly to your inbox.
        </p>

        <form className="es-newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            className="es-newsletter-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            id="newsletter-email"
          />
          <button type="submit" className="es-newsletter-btn">
            Subscribe Now
          </button>
        </form>

        <p className="es-newsletter-note">By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
      </motion.div>
    </section>
  );
};

export default Newsletter;
