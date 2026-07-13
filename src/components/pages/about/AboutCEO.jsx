/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';

const AboutCEO = () => {
  return (
    <section id="ceo" style={{
      padding: '80px 7% 100px',
      background: '#fff',
    }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '18px',
        }}>
          <span style={{ display: 'inline-block', width: '28px', height: '1.5px', background: 'var(--es-emerald)' }} />
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--es-emerald)',
          }}>A Word From</span>
          <span style={{ display: 'inline-block', width: '28px', height: '1.5px', background: 'var(--es-emerald)' }} />
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          fontWeight: 700,
          color: 'var(--es-charcoal)',
          margin: 0,
          lineHeight: 1.2,
        }}>
          Hello from our CEO
        </h2>
      </div>

      {/* Content grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '48px',
        maxWidth: '1100px',
        margin: '0 auto',
        alignItems: 'center',
      }}>
        {/* Image */}
        <div style={{ position: 'relative' }}>
          {/* Decorative offset border */}
          <div style={{
            position: 'absolute',
            top: '18px',
            left: '18px',
            right: '-18px',
            bottom: '-18px',
            borderRadius: '24px',
            border: '2px solid rgba(15,93,78,0.15)',
            zIndex: 0,
          }} />
          <div style={{
            position: 'relative',
            zIndex: 1,
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(15,93,78,0.10)',
            aspectRatio: '4/5',
          }}>
            <img
              src="https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/makeup/skincare-closeup.jpg"
              alt="Eden Sign CEO"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.6s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            {/* Experience badge */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              background: 'var(--es-emerald)',
              borderRadius: '16px',
              padding: '16px 20px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(15,93,78,0.3)',
            }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '24px', color: '#fff', lineHeight: 1 }}>10+</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.85)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '5px' }}>Years of<br/>Excellence</div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          {/* Decorative quote mark */}
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '96px',
            color: 'var(--es-emerald)',
            opacity: 0.15,
            lineHeight: 0.6,
            marginBottom: '12px',
            userSelect: 'none',
          }}>"</div>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15.5px',
            lineHeight: 1.85,
            color: 'var(--es-charcoal-60)',
            margin: '0 0 22px 0',
          }}>
            Hello there, this is your ultimate destination for effortless
            salon appointment bookings! We bridge the gap between clients
            and salons, making beauty and grooming services accessible with
            just a few clicks. Whether you're looking for a haircut, spa
            treatment, or a complete makeover, we've got you covered.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15.5px',
            lineHeight: 1.85,
            color: 'var(--es-charcoal-60)',
            margin: '0 0 36px 0',
          }}>
            Our user-friendly platform helps you discover top-rated salons,
            view their services, check availability, and book your
            appointment instantly. Designed with convenience in mind,
            Eden Sign ensures a seamless experience for both clients and
            salon professionals.
          </p>

          {/* Signature line */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(15,93,78,0.12)',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--es-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#fff',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              flexShrink: 0,
            }}>E</div>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: 'var(--es-charcoal)' }}>Eden Sign</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--es-emerald)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Chief Executive Officer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCEO;
