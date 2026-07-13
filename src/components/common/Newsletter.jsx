/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <section className="es-newsletter-section">
      <motion.div
        ref={ref}
        className="es-newsletter-panel"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Decorative blobs */}
        <div className="es-newsletter-blob-1" />
        <div className="es-newsletter-blob-2" />

        <div className="es-newsletter-content">
          <span className="es-newsletter-eyebrow">The Boutique</span>

          <h2 className="es-newsletter-headline">
            The Eden{' '}
            <em>Journal</em>
          </h2>

          <p className="es-newsletter-subtext">
            Receive a weekly curation of beauty trends, insider interviews, and exclusive salon
            offers directly to your inbox.
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

          <p className="es-newsletter-note">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
