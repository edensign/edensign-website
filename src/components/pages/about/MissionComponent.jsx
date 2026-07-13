/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';

const CARDS = [
  {
    icon: '✦',
    title: 'Exceptional Experiences',
    body: 'At "Eden Sign", our mission is to deliver exceptional salon experiences that empower our clients to look and feel their best. We are dedicated to providing top-quality services that prioritize customer satisfaction, innovation, and inclusivity. Through a commitment to excellence, sustainability, and community engagement, we strive to be the trusted destination for beauty, self-confidence, and well-being.',
  },
  {
    icon: '◆',
    title: 'Transformation & Trust',
    body: "Our client-centric approach and eco-friendly practices define our salon\u2019s character. We aim to create a welcoming and diverse space where individuals can confidently express themselves, knowing that they are in the hands of skilled professionals who care deeply about their needs and preferences. We are more than just a salon franchise; we are a destination for transformation, self-expression, and empowerment.",
  },
];

const VALUES = [
  { emoji: '🌿', label: 'Sustainability' },
  { emoji: '💎', label: 'Excellence' },
  { emoji: '🤝', label: 'Community' },
  { emoji: '✨', label: 'Innovation' },
];

const MissionComponent = () => {
  return (
    <section id="mission" style={{
      padding: '100px 7%',
      background: 'var(--es-cream)',
    }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
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
          }}>Our Values</span>
          <span style={{ display: 'inline-block', width: '28px', height: '1.5px', background: 'var(--es-emerald)' }} />
        </div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          fontWeight: 700,
          color: 'var(--es-charcoal)',
          margin: '0 0 16px 0',
          lineHeight: 1.2,
        }}>
          Our Mission
        </h2>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '15px',
          color: 'var(--es-charcoal-60)',
          maxWidth: '480px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          We exist to make premium beauty experiences accessible, empowering, and unforgettable.
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px',
        maxWidth: '1100px',
        margin: '0 auto 72px',
      }}>
        {CARDS.map((card, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '40px 36px',
            border: '1px solid rgba(15,93,78,0.10)',
            boxShadow: '0 4px 24px rgba(15,93,78,0.06)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            cursor: 'default',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(15,93,78,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(15,93,78,0.06)'; }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(15,93,78,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: 'var(--es-emerald)',
              marginBottom: '22px',
              fontWeight: 700,
            }}>{card.icon}</div>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '20px',
              fontWeight: 600,
              color: 'var(--es-charcoal)',
              margin: '0 0 14px 0',
            }}>{card.title}</h3>
            <div style={{ width: '36px', height: '1.5px', background: 'var(--es-emerald)', marginBottom: '18px', borderRadius: '2px' }} />
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14.5px',
              lineHeight: 1.8,
              color: 'var(--es-charcoal-60)',
              margin: 0,
            }}>{card.body}</p>
          </div>
        ))}
      </div>

      {/* Value pills */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap',
      }}>
        {VALUES.map((v, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 22px',
            borderRadius: '999px',
            border: '1px solid rgba(15,93,78,0.18)',
            background: 'rgba(15,93,78,0.05)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--es-charcoal)',
          }}>
            <span>{v.emoji}</span>
            {v.label}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionComponent;
