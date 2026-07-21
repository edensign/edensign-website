/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import AboutBg from "../../assets/eden-signature.png";
import { BRAND_NAME } from '../../../brand.js';

const AboutPageTop = () => {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        width: '100%',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        background: 'var(--es-cream)',
      }}>
        {/* Left — content */}
        <div style={{
          flex: '0 0 55%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 60px 80px 7%',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '28px',
          }}>
            <span style={{
              display: 'inline-block',
              width: '32px',
              height: '1.5px',
              background: 'var(--es-emerald)',
            }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--es-emerald)',
              background: 'rgba(15,93,78,0.08)',
              padding: '5px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(15,93,78,0.2)',
            }}>
              About {BRAND_NAME}
            </span>
            <span style={{
              display: 'inline-block',
              width: '32px',
              height: '1.5px',
              background: 'var(--es-emerald)',
            }} />
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 4.5vw, 62px)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: 'var(--es-charcoal)',
            margin: '0 0 20px 0',
          }}>
            A Sanctuary of<br />
            <span style={{
              color: 'var(--es-emerald)',
              fontStyle: 'italic',
            }}>Beauty</span> & Self&#8209;Confidence
          </h1>

          {/* Divider */}
          <div style={{
            width: '56px',
            height: '2px',
            background: 'linear-gradient(90deg, var(--es-emerald) 0%, rgba(15,93,78,0.2) 100%)',
            marginBottom: '24px',
            borderRadius: '2px',
          }} />

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'var(--es-charcoal-60)',
            margin: '0 0 40px 0',
            maxWidth: '460px',
          }}>
            Discover our story, values, and dedication to crafting
            exceptional salon experiences that empower you to look
            and feel your absolute best.
          </p>

          {/* CTA row */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#mission" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 28px',
              borderRadius: '999px',
              background: 'var(--es-emerald)',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.03em',
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a5e4e'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--es-emerald)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Our Mission ↓
            </a>
            <a href="#ceo" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 28px',
              borderRadius: '999px',
              background: 'transparent',
              color: 'var(--es-charcoal)',
              border: '1.5px solid rgba(26,21,18,0.2)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.03em',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--es-emerald)'; e.currentTarget.style.color = 'var(--es-emerald)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,21,18,0.2)'; e.currentTarget.style.color = 'var(--es-charcoal)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Meet the Team
            </a>
          </div>
        </div>

        {/* Right — image panel */}
        <div style={{
          flex: '0 0 45%',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative emerald shape */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            left: '-60px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'rgba(15,93,78,0.07)',
            zIndex: 1,
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-40px',
            right: '-40px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(15,93,78,0.05)',
            zIndex: 1,
          }} />

          <img
            src="https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/makeup/skincare-closeup.jpg"
            alt={`${BRAND_NAME} Salon`}
            loading="eager"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
          {/* Image overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, var(--es-cream) 0%, transparent 18%)',
            zIndex: 2,
          }} />

          {/* Floating badge */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '32px',
            zIndex: 3,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '18px 24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            border: '1px solid rgba(15,93,78,0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--es-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '22px' }}>✦</span>
            </div>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '22px', color: 'var(--es-charcoal)', lineHeight: 1 }}>500+</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--es-charcoal-60)', fontWeight: 500, marginTop: '4px', letterSpacing: '0.04em' }}>Premium Salons Listed</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{
        background: 'var(--es-emerald)',
        padding: '40px 7%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px',
      }}>
        {[
          { value: '500+', label: 'Luxury Salons' },
          { value: '12K+', label: 'Happy Clients' },
          { value: '200+', label: 'Expert Stylists' },
          { value: '15+', label: 'Cities Covered' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1,
            }}>{stat.value}</div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.75)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: '6px',
            }}>{stat.label}</div>
          </div>
        ))}
      </section>
    </>
  );
};

export default AboutPageTop;
