/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

const services = [
  {
    icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 36 }} />,
    title: 'Appointments',
    description:
      'Stay free, stay stylish, stay ahead—let us take care of your beauty appointments effortlessly. Discover top-rated salons and book instantly.',
    color: '#c7956c',
    href: '/salons',
  },
  {
    icon: <SupportAgentOutlinedIcon sx={{ fontSize: 36 }} />,
    title: '24/7 Support',
    description:
      'Our dedicated team works around the clock to provide you the best experience with the utmost simplicity and care.',
    color: '#9b7bca',
    href: '/contact',
  },
  {
    icon: <StorefrontOutlinedIcon sx={{ fontSize: 36 }} />,
    title: 'Products',
    description:
      'Explore a curated collection of professional beauty products trusted by salons. Quality guaranteed with easy returns.',
    color: '#56b39a',
    href: '/products',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.16, ease: 'easeOut' },
  }),
};

const ServicesList = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="es-services-section">
      <motion.div
        className="es-section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="es-eyebrow">What We Offer</span>
        <h2 className="es-section-title">Our <em>Services</em></h2>
        <div className="es-title-divider" />
      </motion.div>

      <div className="es-services-grid">
        {services.map((service, i) => (
          <motion.a
            key={i}
            href={service.href}
            className="es-service-card"
            custom={i}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            style={{ textDecoration: 'none' }}
          >
            <div className="es-service-icon" style={{ color: service.color, borderColor: `${service.color}30`, background: `${service.color}12` }}>
              {service.icon}
            </div>
            <h3 className="es-service-card-title" style={{ color: '#1a0f08' }}>{service.title}</h3>
            <p className="es-service-card-desc">{service.description}</p>
            <span className="es-service-link" style={{ color: service.color }}>
              Learn more →
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
