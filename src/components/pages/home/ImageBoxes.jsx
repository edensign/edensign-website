/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const promos = [
  {
    img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/makeup/skincare.jpg',
    eyebrow: 'Best Of',
    headline: 'Salons',
    desc: 'Discover the finest salons in your city — curated, verified, and ready to book.',
    cta: 'Explore Salons',
    href: '/salons',
  },
  {
    img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/makeup/product.jpg',
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
          transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
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
            <a href={promo.href} className="es-btn-primary">{promo.cta}</a>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default ImageBoxes;
