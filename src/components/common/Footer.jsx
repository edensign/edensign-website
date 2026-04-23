/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
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
  { Icon: InstagramIcon, href: 'https://instagram.com/edensign.in?igshid=NzZlODBkYWE4Ng==', label: 'Instagram' },
  { Icon: FacebookIcon, href: '#', label: 'Facebook' },
  { Icon: TwitterIcon, href: '#', label: 'Twitter' },
  { Icon: YouTubeIcon, href: '#', label: 'YouTube' },
];

const contactItems = [
  { Icon: CallIcon, text: '123 488 6532' },
  { Icon: PlaceIcon, text: 'O-44 Shastri Nagar, Bareilly' },
  { Icon: MailIcon, text: 'info@edensign.com' },
  { Icon: ScheduleIcon, text: 'Mon–Fri: 10:00–18:00' },
];

function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleInstagramClick = () => {
    window.open('https://instagram.com/edensign.in?igshid=NzZlODBkYWE4Ng==', '_blank');
  };

  return (
    <footer ref={ref} style={{
      background: 'linear-gradient(180deg, #1a0a00 0%, #0d0500 100%)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative top border */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #c7956c, #a8724d, transparent)',
      }} />

      {/* Decorative background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(199,149,108,0.05) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(199,149,108,0.04) 0%, transparent 50%)`,
        pointerEvents: 'none',
      }} />

      {/* Main footer content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '72px 40px 48px',
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
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #c7956c, #a8724d)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <ContentCutOutlinedIcon sx={{ fontSize: 18, color: '#fff' }} />
              </div>
              <span style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                fontSize: '22px',
                color: '#fff',
                letterSpacing: '0.04em',
              }}>edensign</span>
            </Link>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13.5px',
              color: 'rgba(255,255,255,0.55)',
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
                    borderRadius: '10px',
                    border: '1px solid rgba(199,149,108,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)',
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
            <h4 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#c7956c',
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
                      color: 'rgba(255,255,255,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'color 0.2s, gap 0.2s',
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
            <h4 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#c7956c',
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
                      color: 'rgba(255,255,255,0.6)',
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
            <h4 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#c7956c',
              margin: '32px 0 14px 0',
            }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Appointments', 'Job Portal', 'E-commerce'].map((item) => (
                <span key={item} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.45)',
                }}>
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#c7956c',
                    opacity: 0.5,
                    flexShrink: 0,
                  }} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#c7956c',
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
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: '1.5',
                }}>
                  <Icon sx={{ fontSize: 15, color: '#c7956c', marginTop: '2px', flexShrink: 0 }} />
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
          borderTop: '1px solid rgba(199,149,108,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.3)',
            margin: 0,
          }}>
            © {new Date().getFullYear()} EDENSIGN. All Rights Reserved. Made with ❤️ in India.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.25)',
            margin: 0,
          }}>
            Designed &amp; Built by the Eden Sign Team
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
          color: #c7956c !important;
          gap: 10px !important;
        }
        .es-footer-link:hover .es-footer-link-arrow {
          opacity: 1 !important;
        }

        /* Social icon hover */
        .es-social-icon:hover {
          background: rgba(199,149,108,0.15) !important;
          border-color: rgba(199,149,108,0.5) !important;
          color: #c7956c !important;
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}

export default Footer;
