/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BRAND_NAME } from '../../../brand.js';

const AIAssistantSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="es-ai-assistant-section">
      {/* Background decorative blob */}
      <div
        className="es-hero-blob"
        style={{
          width: '500px',
          height: '500px',
          background: 'rgba(15, 93, 78, 0.08)',
          top: '-100px',
          right: '-100px',
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="es-ai-assistant-grid">
        {/* Left Side: List & Intro */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="es-eyebrow">The AI Concierge</span>
          <h2 className="es-section-title">
            A beauty consultant that <em>never sleeps.</em>
          </h2>

          <ul className="es-ai-list">
            <li className="es-ai-list-item">
              <span className="es-ai-list-dot" />
              AI Hair &amp; Skin analysis from a single photo
            </li>
            <li className="es-ai-list-item">
              <span className="es-ai-list-dot" />
              Personalised professional product routines
            </li>
            <li className="es-ai-list-item">
              <span className="es-ai-list-dot" />
              Voice-first booking, in your language
            </li>
            <li className="es-ai-list-item">
              <span className="es-ai-list-dot" />
              WhatsApp reminders that feel human
            </li>
            <li className="es-ai-list-item">
              <span className="es-ai-list-dot" />
              Follow-up calls that gently keep you glowing
            </li>
          </ul>

          <button
            style={{
              padding: '16px 36px',
              borderRadius: '16px',
              background: 'var(--es-emerald)',
              color: 'var(--es-cream)',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.25s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--es-emerald-soft)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--es-emerald)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Try the Concierge <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </button>
        </motion.div>

        {/* Right Side: Chat Box Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="es-ai-chat-box">
            <div className="es-ai-chat-header">
              <div className="es-ai-chat-avatar">✦</div>
              <div>
                <p className="es-ai-chat-name">{BRAND_NAME} Concierge</p>
                <p className="es-ai-chat-status">Online · replies instantly</p>
              </div>
            </div>

            <div className="es-ai-chat-body">
              <div className="es-ai-msg-received">
                Good morning, Aanya. Your scalp reset is due this week.
              </div>
              <div className="es-ai-msg-sent">
                Book Aurelia Studio, Thursday evening?
              </div>
              <div className="es-ai-msg-received">
                Elena is available at 6:30 PM. I'll add your usual hydrating mask.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--es-charcoal-40)' }}>
                <span className="es-hero-badge-dot es-pulse-dot" />
                typing…
              </div>
            </div>

            <div className="es-ai-chat-footer">
              <input
                type="text"
                placeholder="Ask about your ritual…"
                className="es-ai-chat-input"
                readOnly
              />
              <button className="es-ai-chat-send" aria-label="Send message">
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAssistantSection;
