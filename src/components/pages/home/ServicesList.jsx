/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

const modules = [
  {
    label: 'Salon Discovery',
    note: 'Nearby · Premium · Verified',
    href: '/salons',
    color: '#c7956c',
  },
  {
    label: 'Appointment Booking',
    note: 'Stylist-specific or walk-in',
    href: '/salons',
    color: '#9b7bca',
  },
  {
    label: 'Professional Marketplace',
    note: 'Wholesale · Retail · Brands',
    href: '/products',
    color: '#56b39a',
  },
  {
    label: 'Salon Operations',
    note: 'Inventory · Cashflow · Staff',
    href: '#',
    color: '#e88a6c',
  },
  {
    label: 'Eden Academy',
    note: 'Courses · Workshops · Certifications',
    href: '#',
    color: '#c7956c',
  },
  {
    label: 'Careers Portal',
    note: 'Stylists · Beauticians · Therapists',
    href: '/job-seeker',
    color: '#9b7bca',
  },
  {
    label: 'Franchise Network',
    note: 'Investors · Flagship openings',
    href: '#',
    color: '#56b39a',
  },
  {
    label: 'AI Beauty Concierge',
    note: 'Hair · Skin · Voice · WhatsApp',
    href: '#',
    color: '#e88a6c',
  },
];

const ServicesList = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="es-ecosystem-section">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          className="es-ecosystem-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div className="es-ecosystem-header-inner">
            <span className="es-eyebrow" style={{ color: 'var(--es-rose-gold)' }}>
              One Ecosystem
            </span>
            <h2
              className="es-section-title"
              style={{ marginBottom: 0, maxWidth: '26ch' }}
            >
              Every stakeholder of beauty,{' '}
              <em>under one roof.</em>
            </h2>
          </div>
          <p className="es-ecosystem-subtext">
            Eden Sign quietly connects customers, salons, stylists, academies,
            distributors and brands into a single, elegant workflow.
          </p>
        </motion.div>

        {/* 8-module grid */}
        <div className="es-ecosystem-grid">
          {modules.map((m, i) => (
            <motion.a
              key={m.label}
              href={m.href}
              className="es-ecosystem-cell"
              style={{ textDecoration: 'none' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.06, ease: 'easeOut' }}
            >
              <span className="es-ecosystem-number">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="es-ecosystem-cell-title">{m.label}</h3>
                <p className="es-ecosystem-cell-note">{m.note}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
