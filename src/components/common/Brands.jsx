/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import InstagramIcon from '@mui/icons-material/Instagram';

const brandLogos = [
  { name: "L'Oréal", img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/brands/loreal.jpg' },
  { name: 'Aerin', img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/brands/aerin.jpg' },
  { name: 'MAC', img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/brands/mac.jpg' },
  { name: 'Revlon', img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/brands/revlon.png' },
  { name: 'Fable', img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/brands/fable.jpg' },
  { name: 'Schwarzkopf', img: 'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/brands/schwar.jpg' },
];

const galleryImages = [
  'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/brandImg/brandImg.jpg',
  'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/brandImg/brandImg2.jpg',
  'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/brandImg/brandImg3.jpg',
  'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/brandImg/brandImg4.jpg',
  'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/brandImg/brandImg5.jpg',
  'https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/brandImg/brandImg6.jpg',
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
        <h2 className="es-section-title">Our <em>Brands</em></h2>
        <div className="es-title-divider" />
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
            <img src={img} alt={`Eden Sign gallery ${i + 1}`} className="es-insta-img" />
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
          <InstagramIcon sx={{ fontSize: 32, color: '#c7956c' }} />
          <span className="es-insta-handle-label">Follow Us</span>
          <span className="es-insta-handle">@edensign</span>
        </a>
      </motion.div>
    </section>
  );
};

export default Brands;
