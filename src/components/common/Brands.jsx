/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import InstagramIcon from '@mui/icons-material/Instagram';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const brandLogos = [
  { name: "L'Oréal",       img: 'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/brands/loreal.jpg' },
  { name: 'Aerin',          img: 'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/brands/aerin.jpg' },
  { name: 'MAC',             img: 'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/brands/mac.jpg' },
  { name: 'Revlon',          img: 'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/brands/revlon.png' },
  { name: 'Fable',           img: 'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/brands/fable.jpg' },
  { name: 'Schwarzkopf',     img: 'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/brands/schwar.jpg' },
];

const galleryImages = [
  'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/brandImg/brandImg.jpg',
  'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/brandImg/brandImg2.jpg',
  'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/brandImg/brandImg3.jpg',
  'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/brandImg/brandImg4.jpg',
  'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/brandImg/brandImg5.jpg',
  'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/brandImg/brandImg6.jpg',
];

const Brands = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="es-brands-section">
      {/* Section header */}
      <motion.div
        className="es-section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="es-eyebrow">Trusted Partners</span>
        <h2 className="es-section-title">
          Our <em>Brands</em>
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            color: 'var(--es-muted)',
            maxWidth: '420px',
            margin: '16px auto 0',
            lineHeight: 1.7,
          }}
        >
          Trusted by the houses that define beauty — from global powerhouses to artisan boutiques.
        </p>
        <div className="es-title-divider" style={{ margin: '20px auto 0' }} />
      </motion.div>

      {/* Infinite marquee */}
      <div className="es-marquee-wrapper">
        <div className="es-marquee-track">
          {[...brandLogos, ...brandLogos].map((brand, i) => (
            <div key={i} className="es-marquee-item">
              <img src={brand.img} alt={brand.name} className="es-brand-logo" />
            </div>
          ))}
        </div>
      </div>

      {/* Instagram gallery grid */}
      <motion.div
        className="es-insta-grid"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {galleryImages.map((img, i) => (
          <a
            key={i}
            href="https://instagram.com/edensign.in"
            target="_blank"
            rel="noreferrer"
            className="es-insta-cell"
          >
            <img
              src={img}
              alt={`Eden Sign gallery ${i + 1}`}
              className="es-insta-img"
              loading="lazy"
              decoding="async"
            />
            <div className="es-insta-hover">
              <InstagramIcon sx={{ fontSize: 28, color: '#fff' }} />
            </div>
          </a>
        ))}

        {/* Center overlay card */}
        <a
          href="https://instagram.com/edensign.in"
          target="_blank"
          rel="noreferrer"
          className="es-insta-center-card"
        >
          <AutoAwesomeIcon sx={{ fontSize: 28, color: 'var(--es-rose-gold)' }} />
          <span className="es-insta-handle-label">Follow Us</span>
          <span className="es-insta-handle">@edensign</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              color: 'rgba(26,10,0,0.4)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}
          >
            On Instagram
          </span>
        </a>
      </motion.div>
    </section>
  );
};

export default Brands;
