/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const promos = [
  {
    img: 'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/makeup/skincare.jpg',
    eyebrow: 'Best Of',
    headline: 'Salons',
    desc: 'Discover the finest salons in your city — curated, verified, and ready to book.',
    cta: 'Explore Salons',
    href: '/salons',
  },
  {
    img: 'https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/makeup/product.jpg',
    eyebrow: 'Book Your',
    headline: 'Appointment',
    desc: 'Premium beauty experiences at your fingertips — bookable in under 60 seconds.',
    cta: 'Book Now',
    href: '/salons',
  },
];

const ImageBoxes = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="es-promo-section">
      {promos.map((promo, i) => (
        <motion.div
          key={i}
          className="es-promo-card"
          initial={{ opacity: 0, x: i === 0 ? -60 : 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, delay: i * 0.15, ease: 'easeOut' }}
        >
          <div className="es-promo-img-wrapper">
            <img
              src={promo.img}
              alt={promo.headline}
              className="es-promo-img"
              loading="lazy"
              decoding="async"
            />
            <div className="es-promo-overlay" />
          </div>

          <div className="es-promo-content">
            <span className="es-promo-eyebrow">{promo.eyebrow}</span>
            <h2 className="es-promo-headline">{promo.headline}</h2>
            <p className="es-promo-desc">{promo.desc}</p>
            <a
              href={promo.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 36px',
                background: 'var(--es-rose-gold)',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '100px',
                transition: 'background 0.3s ease, transform 0.25s ease',
                boxShadow: '0 8px 28px rgba(199, 149, 108, 0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#a8724d';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--es-rose-gold)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {promo.cta} →
            </a>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default ImageBoxes;
