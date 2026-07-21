/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { BRAND_NAME, BRAND_COMPACT, BRAND_INSTAGRAM, BRAND_FACEBOOK, BRAND_TWITTER, BRAND_YOUTUBE, BRAND_EMAIL_INFO, BRAND_PHONE, BRAND_ADDRESS, BRAND_HOURS, BRAND_COPYRIGHT_YEAR, BRAND_LEGAL } from '../../brand.js';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import CallIcon from '@mui/icons-material/Call';
import PlaceIcon from '@mui/icons-material/Place';
import MailIcon from '@mui/icons-material/Mail';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const quickLinks = [
  { label: 'Salons', href: '/salons' },
  { label: 'Job Seeker', href: '/job-seeker' },
  { label: 'Products', href: '/products' },
  { label: 'Academy', href: '/academy' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Legal Info', href: '/legal-info' },
];

const socialLinks = [
  { Icon: InstagramIcon, href: BRAND_INSTAGRAM, label: 'Instagram' },
  { Icon: FacebookIcon, href: BRAND_FACEBOOK, label: 'Facebook' },
  { Icon: TwitterIcon, href: BRAND_TWITTER, label: 'Twitter' },
  { Icon: YouTubeIcon, href: BRAND_YOUTUBE, label: 'YouTube' },
];


const contactItems = [
  { Icon: CallIcon, text: BRAND_PHONE },
  { Icon: PlaceIcon, text: BRAND_ADDRESS },
  { Icon: MailIcon, text: BRAND_EMAIL_INFO },
  { Icon: ScheduleIcon, text: BRAND_HOURS },
];

function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleInstagramClick = () => {
    window.open(BRAND_INSTAGRAM, '_blank');
  };

  return (
    <footer ref={ref} style={{
      background: 'var(--es-background)',
      color: 'var(--es-on-surface)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(131, 116, 106, 0.2)',
    }}>
      {/* Decorative top border */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, transparent, var(--es-rose-gold), var(--es-primary), transparent)',
      }} />

      {/* Decorative background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(199,149,108,0.03) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(199,149,108,0.02) 0%, transparent 50%)`,
        pointerEvents: 'none',
      }} />

      {/* Main footer content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 40px 48px',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1.4fr',
            gap: '48px',
          }}
          className="es-footer-grid"
        >
          {/* Brand Column */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 600,
                fontSize: '24px',
                color: 'var(--es-primary)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>{BRAND_NAME}</span>
            </Link>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13.5px',
              color: 'var(--es-on-surface-variant)',
              lineHeight: '1.8',
              margin: '0 0 28px 0',
              maxWidth: '280px',
            }}>
              India's premier salon platform. Book appointments, discover talent, and shop professional beauty products — all in one place.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid var(--es-outline-variant)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--es-on-surface-variant)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  className="es-social-icon"
                  onClick={label === 'Instagram' ? handleInstagramClick : undefined}
                >
                  <Icon sx={{ fontSize: 16 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-label-caps" style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: 'var(--es-primary)',
              margin: '0 0 20px 0',
            }}>Navigation</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    style={{
                      textDecoration: 'none',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13.5px',
                      color: 'var(--es-on-surface-variant)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s',
                    }}
                    className="es-footer-link"
                  >
                    <ArrowForwardIcon sx={{ fontSize: 12, opacity: 0, transition: 'opacity 0.2s' }} className="es-footer-link-arrow" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-label-caps" style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: 'var(--es-primary)',
              margin: '0 0 20px 0',
            }}>Legal</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    style={{
                      textDecoration: 'none',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13.5px',
                      color: 'var(--es-on-surface-variant)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'color 0.2s',
                    }}
                    className="es-footer-link"
                  >
                    <ArrowForwardIcon sx={{ fontSize: 12, opacity: 0 }} className="es-footer-link-arrow" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Platform badges */}
            <h4 className="font-label-caps" style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: 'var(--es-primary)',
              margin: '32px 0 14px 0',
            }}>Platform</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Appointments', href: '/salons', Icon: CalendarTodayOutlinedIcon },
                { label: 'Job Portal', href: '/job-seeker', Icon: WorkOutlineOutlinedIcon },
                { label: 'E-commerce', href: '/products', Icon: ShoppingBagOutlinedIcon },
              ].map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link
                    to={href}
                    style={{
                      textDecoration: 'none',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13.5px',
                      color: 'var(--es-on-surface-variant)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'opacity 0.2s',
                    }}
                    className="es-footer-link"
                  >
                    <ArrowForwardIcon sx={{ fontSize: 12, opacity: 0, transition: 'opacity 0.2s' }} className="es-footer-link-arrow" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-label-caps" style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: 'var(--es-primary)',
              margin: '0 0 20px 0',
            }}>Get In Touch</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {contactItems.map(({ Icon, text }) => (
                <li key={text} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: 'var(--es-on-surface-variant)',
                  lineHeight: '1.5',
                }}>
                  <Icon sx={{ fontSize: 15, color: 'var(--es-primary)', marginTop: '2px', flexShrink: 0 }} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div style={{
          marginTop: '56px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(131, 116, 106, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: 'var(--es-on-surface-variant)',
            opacity: 0.6,
            margin: 0,
          }}>
            © {BRAND_COPYRIGHT_YEAR} {BRAND_LEGAL}. All Rights Reserved. Made with ❤️ in India.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: 'var(--es-on-surface-variant)',
            opacity: 0.5,
            margin: 0,
          }}>
            Designed &amp; Built by  — Codevamp Technologies
          </p>
        </div>
      </div>

      <style>{`
        /* Footer responsive */
        .es-footer-grid {
          grid-template-columns: 2fr 1fr 1fr 1.4fr;
        }
        @media (max-width: 960px) {
          .es-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          .es-footer-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Footer link hover */
        .es-footer-link:hover {
          color: var(--es-primary) !important;
          gap: 10px !important;
        }
        .es-footer-link:hover .es-footer-link-arrow {
          opacity: 1 !important;
        }

        /* Social icon hover */
        .es-social-icon:hover {
          background: rgba(127, 85, 50, 0.08) !important;
          border-color: var(--es-primary) !important;
          color: var(--es-primary) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}

export default Footer;
