
import { useState, useEffect } from "react";
import { Formik } from 'formik';
import { CircularProgress } from "@mui/material";
import { useToast } from "../../common/Toast";

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

import flowerimage from "../../assets/flower.png";
import appointmentBg from "../../assets/appointment.jpg";
import { ContactAPI } from "../../../apis/ContactAPI";
import { SkeletonStyles, ContactPageSkeleton } from "../../common/PageSkeletons";
import { BRAND_EMAIL, BRAND_EMAIL_INFO, BRAND_PHONE, BRAND_ADDRESS, BRAND_HOURS, BRAND_INSTAGRAM, BRAND_FACEBOOK, BRAND_YOUTUBE, BRAND_TWITTER, BRAND_NAME } from '../../../brand.js';

/* ── helpers ── */
const CONTACT_CARDS = [
  {
    icon: '📞',
    label: 'Phone',
    value: BRAND_PHONE,
    href: `tel:${BRAND_PHONE}`,
  },
  {
    icon: '✉️',
    label: 'Email',
    value: BRAND_EMAIL,
    href: `mailto:${BRAND_EMAIL}`,
  },
  {
    icon: '📍',
    label: 'Address',
    value: BRAND_ADDRESS,
    href: null,
  },
  {
    icon: '🕐',
    label: 'Hours',
    value: BRAND_HOURS,
    href: null,
  },
];

const SOCIALS = [
  { Icon: FacebookOutlinedIcon, label: 'Facebook', href: '#' },
  { Icon: TwitterIcon,          label: 'Twitter',  href: '#' },
  { Icon: InstagramIcon,        label: 'Instagram', href: '#' },
  { Icon: YouTubeIcon,          label: 'YouTube',  href: '#' },
];

const initialValues = { name: '', email: '', message: '' };

/* ── field style helper ── */
const inputStyle = (disabled) => ({
  width: '100%',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  padding: '14px 16px',
  border: '1.5px solid rgba(15,93,78,0.15)',
  borderRadius: '10px',
  background: disabled ? '#f9f9f9' : '#fff',
  color: 'var(--es-charcoal)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  resize: 'vertical',
  boxSizing: 'border-box',
});

function ContactUsForm() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPageLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await ContactAPI.submitContact(values);
      if (response.status === 'Success') {
        showToast('Your message has been sent successfully!', 'success');
        resetForm();
      } else {
        showToast(response.msg || 'Something went wrong', 'error');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!pageLoaded) {
    return (
      <>
        <SkeletonStyles />
        <ContactPageSkeleton />
      </>
    );
  }

  return (
    <div style={{
      background: 'var(--es-cream)',
      minHeight: '100vh',
      position: 'relative',
    }}>
      <SkeletonStyles />

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        backgroundImage: `url(${appointmentBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundAttachment: 'fixed',
        padding: '120px 7% 100px',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Dark emerald overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(10,50,42,0.92) 0%, rgba(26,21,18,0.88) 60%, rgba(15,93,78,0.75) 100%)',
          zIndex: 0,
        }} />
        {/* Decorative glowing orbs */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '360px', height: '360px', borderRadius: '50%', background: 'rgba(15,93,78,0.25)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(15,93,78,0.18)', filter: 'blur(48px)', pointerEvents: 'none', zIndex: 1 }} />

        {/* All content needs zIndex to sit above overlay */}
        <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '22px',
        }}>
          <span style={{ display: 'inline-block', width: '28px', height: '1.5px', background: 'var(--es-emerald)' }} />
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--es-emerald)',
            background: 'rgba(15,93,78,0.15)',
            padding: '5px 14px',
            borderRadius: '999px',
            border: '1px solid rgba(15,93,78,0.3)',
          }}>Get In Touch</span>
          <span style={{ display: 'inline-block', width: '28px', height: '1.5px', background: 'var(--es-emerald)' }} />
        </div>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(32px, 4vw, 56px)',
          fontWeight: 700,
          color: '#fff',
          margin: '0 0 16px 0',
          lineHeight: 1.15,
        }}>
          We'd Love to <span style={{ color: 'var(--es-emerald)', fontStyle: 'italic' }}>Hear</span> From You
        </h1>
        <div style={{ width: '56px', height: '2px', background: 'var(--es-emerald)', margin: '0 auto 20px', borderRadius: '2px' }} />
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          color: 'rgba(255,255,255,0.65)',
          maxWidth: '520px',
          margin: '0 auto',
          lineHeight: 1.75,
        }}>
          Have a question, feedback, or just want to say hello? Drop us a message and we'll get back to you within 24 hours.
        </p>
        </div>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section style={{
        padding: '0 7%',
        marginTop: '-36px',
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '-36px auto 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        boxSizing: 'border-box',
        paddingLeft: '7%',
        paddingRight: '7%',
      }}>
        {CONTACT_CARDS.map((card, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '28px 24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
            border: '1px solid rgba(15,93,78,0.08)',
            transition: 'transform 0.25s, box-shadow 0.25s',
            cursor: card.href ? 'pointer' : 'default',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(15,93,78,0.10)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.07)'; }}
          >
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'rgba(15,93,78,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', marginBottom: '16px',
            }}>{card.icon}</div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--es-emerald)',
              marginBottom: '6px',
            }}>{card.label}</div>
            {card.href ? (
              <a href={card.href} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--es-charcoal)',
                textDecoration: 'none',
                lineHeight: 1.55,
              }}>{card.value}</a>
            ) : (
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: 'var(--es-charcoal-60)',
                margin: 0,
                lineHeight: 1.55,
              }}>{card.value}</p>
            )}
          </div>
        ))}
      </section>

      {/* ── MAIN CONTENT: Form + Map ── */}
      {/* Subtle pattern background strip */}
      <div style={{
        background: `
          radial-gradient(circle at 15% 50%, rgba(15,93,78,0.06) 0%, transparent 55%),
          radial-gradient(circle at 85% 20%, rgba(15,93,78,0.05) 0%, transparent 50%),
          var(--es-cream)
        `,
        paddingBottom: '80px',
      }}>
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 7% 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '40px',
        alignItems: 'start',
        boxSizing: 'border-box',
      }}>

        {/* Form card */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '44px 40px',
          boxShadow: '0 8px 40px rgba(15,93,78,0.07)',
          border: '1px solid rgba(15,93,78,0.08)',
        }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ width: '24px', height: '1.5px', background: 'var(--es-emerald)', display: 'inline-block' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--es-emerald)' }}>Send a Message</span>
            </div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '26px',
              fontWeight: 700,
              color: 'var(--es-charcoal)',
              margin: 0,
            }}>Send Your Question</h2>
          </div>

          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ touched, dirty, errors, values, handleSubmit, handleChange, handleBlur }) => (
              <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: 'var(--es-charcoal)', marginBottom: '6px', letterSpacing: '0.04em' }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    style={inputStyle(loading)}
                    onFocus={e => { e.target.style.borderColor = 'var(--es-emerald)'; e.target.style.boxShadow = '0 0 0 3px rgba(15,93,78,0.08)'; }}
                    onBlurCapture={e => { e.target.style.borderColor = 'rgba(15,93,78,0.15)'; e.target.style.boxShadow = 'none'; }}
                  />
                  {touched.name && errors.name && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#e53e3e', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: 'var(--es-charcoal)', marginBottom: '6px', letterSpacing: '0.04em' }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    style={inputStyle(loading)}
                    onFocus={e => { e.target.style.borderColor = 'var(--es-emerald)'; e.target.style.boxShadow = '0 0 0 3px rgba(15,93,78,0.08)'; }}
                    onBlurCapture={e => { e.target.style.borderColor = 'rgba(15,93,78,0.15)'; e.target.style.boxShadow = 'none'; }}
                  />
                  {touched.email && errors.email && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#e53e3e', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: 'var(--es-charcoal)', marginBottom: '6px', letterSpacing: '0.04em' }}>Your Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    style={{ ...inputStyle(loading), resize: 'vertical' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--es-emerald)'; e.target.style.boxShadow = '0 0 0 3px rgba(15,93,78,0.08)'; }}
                    onBlurCapture={e => { e.target.style.borderColor = 'rgba(15,93,78,0.15)'; e.target.style.boxShadow = 'none'; }}
                  />
                  {touched.message && errors.message && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#e53e3e', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={!dirty || loading}
                  style={{
                    marginTop: '8px',
                    padding: '15px 32px',
                    borderRadius: '999px',
                    border: 'none',
                    background: !dirty || loading ? 'rgba(15,93,78,0.3)' : 'var(--es-emerald)',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: !dirty || loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
                    boxShadow: '0 4px 16px rgba(15,93,78,0.2)',
                  }}
                  onMouseEnter={e => { if (!loading && dirty) { e.currentTarget.style.background = '#0a5e4e'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,93,78,0.3)'; } }}
                  onMouseLeave={e => { e.currentTarget.style.background = !dirty || loading ? 'rgba(15,93,78,0.3)' : 'var(--es-emerald)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,93,78,0.2)'; }}
                >
                  {loading ? <CircularProgress size={18} color="inherit" /> : '✦ Send Message'}
                </button>
              </form>
            )}
          </Formik>
        </div>

        {/* Right column: Map + Social */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* Map */}
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(15,93,78,0.07)',
            border: '1px solid rgba(15,93,78,0.08)',
            lineHeight: 0,
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112333.35766226827!2d79.33953766096158!3d28.376457597534422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a007b41b1eec35%3A0xc44ff0449ba21640!2sEden%20Signature!5e0!3m2!1sen!2sin!4v1694590873945!5m2!1sen!2sin"
              width="100%"
              height="320"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Eden Sign Location"
            />
          </div>

          {/* Social card */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '32px 28px',
            boxShadow: '0 8px 32px rgba(15,93,78,0.06)',
            border: '1px solid rgba(15,93,78,0.08)',
          }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--es-emerald)', marginBottom: '8px' }}>Follow Us</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 600, color: 'var(--es-charcoal)', margin: 0 }}>Stay Connected</h3>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {SOCIALS.map(({ Icon, label, href }, i) => (
                <a key={i} href={href} aria-label={label} style={{
                  width: '44px', height: '44px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(15,93,78,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--es-charcoal-60)',
                  transition: 'background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--es-emerald)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--es-emerald)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--es-charcoal-60)'; e.currentTarget.style.borderColor = 'rgba(15,93,78,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <Icon style={{ fontSize: '18px' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Flower image card */}
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            height: '220px',
            boxShadow: '0 8px 32px rgba(15,93,78,0.08)',
            border: '1px solid rgba(15,93,78,0.08)',
            position: 'relative',
          }}>
            <img
              src={flowerimage}
              alt="Eden Sign"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(26,21,18,0.5) 0%, transparent 55%)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '24px',
            }}>
              <div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: '#fff' }}>Eden Sign</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginTop: '4px' }}>Beauty & Self-Confidence</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

export default ContactUsForm;
