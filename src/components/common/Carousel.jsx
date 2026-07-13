/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * Hero section redesigned to match the Eden Sign premium reference design.
 * Split layout: text + search bar left, hero image + floating cards right.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './carousel.css';

/* ── Inline SVG icons (no extra deps) ── */
const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0, color: 'var(--es-emerald)' }}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--es-blush-deep)' }}>
    <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" />
  </svg>
);

const Carousel = () => {
  const [city, setCity] = useState('');
  const [service, setService] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/salons${city ? `?q=${encodeURIComponent(city)}` : ''}`);
  };

  return (
    <section className="es-hero-new">
      {/* Decorative blobs */}
      <div className="es-hero-blob es-hero-blob-1" />
      <div className="es-hero-blob es-hero-blob-2" />

      <div className="es-hero-container">
        <div className="es-hero-grid">

          {/* ── Left: Text + Search ── */}
          <div className="es-hero-text-col">

            <span className="es-hero-badge">
              <span className="es-hero-badge-dot es-pulse-dot" />
              The Salon Ecosystem
            </span>

            <h1 className="es-hero-h1">
              The sanctuary for{' '}
              <em className="es-hero-h1-accent">exceptional</em> beauty.
            </h1>

            <p className="es-hero-subtext">
              Discover elite salons, book master stylists, source professional formulas, learn from
              global academies, and belong to a world designed around the craft of beauty.
            </p>

            {/* Search bar */}
            <form className="es-hero-search" onSubmit={handleSearch}>
              <div className="es-hero-search-city">
                <PinIcon />
                <input
                  type="text"
                  placeholder="Search salons in your city…"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="es-hero-search-input"
                  id="hero-city-search"
                />
              </div>
              <div className="es-hero-search-divider" />
              <div className="es-hero-search-service">
                <span className="es-hero-search-label">Service</span>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="es-hero-search-select"
                  id="hero-service-select"
                >
                  <option>Any ritual</option>
                  <option>Hair</option>
                  <option>Skin</option>
                  <option>Nails</option>
                  <option>Bridal</option>
                </select>
              </div>
              <button type="submit" className="es-hero-search-btn" id="hero-search-btn">
                <SearchIcon /> Find
              </button>
            </form>

            {/* Feature tags */}
            <div className="es-hero-tags">
              <span className="es-hero-tag">
                <SparkleIcon />
                AI Beauty Concierge
              </span>
              <span className="es-hero-tag">
                <span className="es-hero-tag-dot" />
                Verified salons &amp; stylists
              </span>
              <span className="es-hero-tag">
                <span className="es-hero-tag-dot" />
                WhatsApp &amp; Voice reminders
              </span>
            </div>
          </div>

          {/* ── Right: Images + Floating Cards ── */}
          <div className="es-hero-img-col">

            {/* Main hero image */}
            <div className="es-hero-img-main">
              <img
                src="https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/header/photo1.jpg"
                alt="A luxury Eden Sign salon interior with warm ambient light"
                className="es-hero-img-main-img"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Small floating image bottom-left */}
            <div className="es-hero-img-float es-animate-float">
              <img
                src="https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/header/photo2.jpg"
                alt="Premium beauty product from the Eden Sign marketplace"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Live booking card top-right */}
            <div className="es-hero-booking-card es-animate-float-card">
              <div className="es-hero-card-header">
                <span className="es-hero-card-dot es-pulse-dot" />
                <span className="es-hero-card-label">Live booking</span>
              </div>
              <p className="es-hero-card-salon">Maison de Beauté</p>
              <p className="es-hero-card-info">Bandra · 4 slots today</p>
              <a href="/salons" className="es-hero-card-btn">Reserve</a>
            </div>

            {/* AI chip bottom-right */}
            <div className="es-hero-ai-chip">
              <span className="es-hero-ai-icon">✦</span>
              <span className="es-hero-ai-text">AI ASSISTANT</span>
              <span className="es-hero-ai-sub">Analyze my routine</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default React.memo(Carousel);
