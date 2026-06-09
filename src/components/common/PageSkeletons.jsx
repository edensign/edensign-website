/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * PageSkeletons.jsx — Reusable shimmer skeleton components for every page.
 * Uses pure CSS shimmer (no MUI Skeleton dependency) for performance.
 */

import React from 'react';

/* ─────────────── Shared shimmer keyframe injected once ─────────────── */
export const SkeletonStyles = () => (
  <style>{`
    @keyframes es-shimmer {
      0%   { background-position: -700px 0; }
      100% { background-position:  700px 0; }
    }
    .es-sk {
      background: linear-gradient(90deg, #f0ebe6 25%, #e6ddd6 50%, #f0ebe6 75%);
      background-size: 700px 100%;
      animation: es-shimmer 1.6s infinite linear;
      border-radius: 6px;
    }
    .es-sk-dark {
      background: linear-gradient(90deg, #2a1f1a 25%, #3d2d25 50%, #2a1f1a 75%);
      background-size: 700px 100%;
      animation: es-shimmer 1.6s infinite linear;
      border-radius: 6px;
    }
  `}</style>
);

/* ─────────────── Hero / Carousel Skeleton ─────────────── */
export const HeroSkeleton = ({ height = '580px', dark = false }) => (
  <div style={{ width: '100%', height, position: 'relative', overflow: 'hidden' }}
    className={dark ? 'es-sk-dark' : 'es-sk'}>
    <div style={{
      position: 'absolute', bottom: '15%', left: '8%',
      display: 'flex', flexDirection: 'column', gap: '16px', width: '40%',
    }}>
      <div className="es-sk" style={{ height: '14px', width: '30%', background: '#e8e0d8' }} />
      <div className="es-sk" style={{ height: '56px', width: '100%', background: '#e8e0d8' }} />
      <div className="es-sk" style={{ height: '56px', width: '80%', background: '#e8e0d8' }} />
      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        <div className="es-sk" style={{ height: '48px', width: '130px', borderRadius: '30px', background: '#e8e0d8' }} />
        <div className="es-sk" style={{ height: '48px', width: '130px', borderRadius: '30px', background: '#e8e0d8' }} />
      </div>
    </div>
  </div>
);

/* ─────────────── Stats Bar Skeleton ─────────────── */
export const StatsBarSkeleton = () => (
  <div style={{
    display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap',
    padding: '28px 5%', background: '#fff', borderBottom: '1px solid rgba(199,149,108,0.1)',
  }}>
    {[1, 2, 3, 4].map(i => (
      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div className="es-sk" style={{ height: '32px', width: '80px' }} />
        <div className="es-sk" style={{ height: '14px', width: '100px' }} />
      </div>
    ))}
  </div>
);

/* ─────────────── Section Header Skeleton ─────────────── */
export const SectionHeaderSkeleton = ({ centered = true }) => (
  <div style={{
    display: 'flex', flexDirection: 'column',
    alignItems: centered ? 'center' : 'flex-start',
    gap: '10px', marginBottom: '40px',
  }}>
    <div className="es-sk" style={{ height: '13px', width: '110px' }} />
    <div className="es-sk" style={{ height: '42px', width: centered ? '280px' : '240px' }} />
    <div className="es-sk" style={{ height: '2px', width: '50px' }} />
  </div>
);

/* ─────────────── Service Card Skeleton (Home page) ─────────────── */
export const ServiceCardSkeleton = () => (
  <div style={{
    background: '#fff', borderRadius: '20px', padding: '36px 28px',
    boxShadow: '0 4px 20px rgba(26,10,0,0.05)', border: '1px solid rgba(199,149,108,0.1)',
  }}>
    <div className="es-sk" style={{ width: '60px', height: '60px', borderRadius: '16px', marginBottom: '20px' }} />
    <div className="es-sk" style={{ height: '20px', width: '55%', marginBottom: '12px' }} />
    <div className="es-sk" style={{ height: '13px', width: '95%', marginBottom: '8px' }} />
    <div className="es-sk" style={{ height: '13px', width: '80%', marginBottom: '8px' }} />
    <div className="es-sk" style={{ height: '13px', width: '60%', marginBottom: '24px' }} />
    <div className="es-sk" style={{ height: '14px', width: '90px' }} />
  </div>
);

/* ─────────────── Banner Skeleton (Sponsored) ─────────────── */
export const SponsoredBannerSkeleton = () => (
  <div style={{ padding: '60px 5%', background: '#fff' }}>
    <SectionHeaderSkeleton centered />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div className="es-sk" style={{ height: '380px', borderRadius: '20px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[1, 2].map(i => (
          <div key={i} style={{ display: 'flex', gap: '16px', background: '#f8f4f0', borderRadius: '16px', overflow: 'hidden' }}>
            <div className="es-sk" style={{ width: '140px', height: '140px', borderRadius: '0', flexShrink: 0 }} />
            <div style={{ flex: 1, padding: '20px 16px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="es-sk" style={{ height: '18px', width: '70%' }} />
              <div className="es-sk" style={{ height: '13px', width: '50%' }} />
              <div className="es-sk" style={{ height: '13px', width: '40%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────── Product Carousel Skeleton (Home) ─────────────── */
export const ProductCarouselSkeleton = () => (
  <div style={{ padding: '60px 5%', background: '#f8fafc' }}>
    <SectionHeaderSkeleton centered />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(26,10,0,0.05)' }}>
          <div className="es-sk" style={{ height: '220px', borderRadius: 0 }} />
          <div style={{ padding: '20px' }}>
            <div className="es-sk" style={{ height: '12px', width: '40%', marginBottom: '8px' }} />
            <div className="es-sk" style={{ height: '18px', width: '75%', marginBottom: '12px' }} />
            <div className="es-sk" style={{ height: '20px', width: '100px' }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─────────────── Image Grid Skeleton (Home ImageBoxes) ─────────────── */
export const ImageGridSkeleton = ({ rows = 2, cols = 3, height = '220px', padding = '60px 5%', bg = '#fff' }) => (
  <div style={{ padding, background: bg }}>
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '16px' }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div key={i} className="es-sk" style={{ height, borderRadius: '16px' }} />
      ))}
    </div>
  </div>
);

/* ─────────────── About Block Skeleton ─────────────── */
export const AboutBlockSkeleton = () => (
  <div style={{ display: 'flex', gap: '48px', padding: '60px 5%', background: '#f8f4f0', alignItems: 'center', flexWrap: 'wrap' }}>
    <div className="es-sk" style={{ flex: '0 0 45%', height: '360px', borderRadius: '20px' }} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div className="es-sk" style={{ height: '13px', width: '90px' }} />
      <div className="es-sk" style={{ height: '40px', width: '60%' }} />
      <div className="es-sk" style={{ height: '13px', width: '100%' }} />
      <div className="es-sk" style={{ height: '13px', width: '90%' }} />
      <div className="es-sk" style={{ height: '13px', width: '95%' }} />
      <div className="es-sk" style={{ height: '13px', width: '70%' }} />
      <div className="es-sk" style={{ height: '44px', width: '150px', borderRadius: '30px', marginTop: '8px' }} />
    </div>
  </div>
);

/* ─────────────── Brands Strip Skeleton ─────────────── */
export const BrandsSkeleton = () => (
  <div style={{ padding: '40px 5%', background: '#fff' }}>
    <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="es-sk" style={{ width: '100px', height: '40px', borderRadius: '8px' }} />
      ))}
    </div>
  </div>
);

/* ─────────────── Testimonials Skeleton ─────────────── */
export const TestimonialsSkeleton = () => (
  <div style={{ padding: '60px 5%', background: '#f8f4f0' }}>
    <SectionHeaderSkeleton centered />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ background: '#fff', borderRadius: '20px', padding: '28px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
            <div className="es-sk" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
            <div style={{ flex: 1 }}>
              <div className="es-sk" style={{ height: '16px', width: '60%', marginBottom: '6px' }} />
              <div className="es-sk" style={{ height: '12px', width: '40%' }} />
            </div>
          </div>
          <div className="es-sk" style={{ height: '13px', width: '100%', marginBottom: '6px' }} />
          <div className="es-sk" style={{ height: '13px', width: '85%', marginBottom: '6px' }} />
          <div className="es-sk" style={{ height: '13px', width: '70%' }} />
        </div>
      ))}
    </div>
  </div>
);

/* ─────────────── Newsletter Skeleton ─────────────── */
export const NewsletterSkeleton = () => (
  <div style={{ padding: '60px 5%', background: '#1a0a00', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
    <div className="es-sk-dark" style={{ height: '13px', width: '110px' }} />
    <div className="es-sk-dark" style={{ height: '40px', width: '340px' }} />
    <div className="es-sk-dark" style={{ height: '13px', width: '260px' }} />
    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
      <div className="es-sk-dark" style={{ height: '52px', width: '260px', borderRadius: '12px' }} />
      <div className="es-sk-dark" style={{ height: '52px', width: '130px', borderRadius: '12px' }} />
    </div>
  </div>
);

/* ─────────────── Page Top Banner Skeleton (Salon, Product) ─────────────── */
export const PageTopBannerSkeleton = ({ height = '400px' }) => (
  <div style={{ width: '100%', height, position: 'relative', overflow: 'hidden' }}
    className="es-sk">
    <div style={{
      position: 'absolute', bottom: '12%', left: '8%',
      display: 'flex', flexDirection: 'column', gap: '14px', width: '45%',
    }}>
      <div className="es-sk" style={{ height: '12px', width: '80px', background: '#e8e0d8' }} />
      <div className="es-sk" style={{ height: '48px', width: '100%', background: '#e8e0d8' }} />
      <div className="es-sk" style={{ height: '36px', width: '60px', borderRadius: '30px', background: '#e8e0d8' }} />
    </div>
  </div>
);

/* ─────────────── Salon Card Skeleton ─────────────── */
export const SalonCardSkeleton = () => (
  <div style={{
    background: '#fff', borderRadius: '20px', overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(26,10,0,0.06)', border: '1px solid rgba(199,149,108,0.1)',
  }}>
    <div className="es-sk" style={{ height: '260px', borderRadius: 0 }} />
    <div style={{ padding: '20px 24px 24px' }}>
      <div className="es-sk" style={{ height: '22px', width: '65%', marginBottom: '10px' }} />
      <div className="es-sk" style={{ height: '13px', width: '80%', marginBottom: '20px' }} />
      <div className="es-sk" style={{ height: '14px', width: '90px' }} />
    </div>
  </div>
);

/* ─────────────── Salon List Grid Skeleton ─────────────── */
export const SalonGridSkeleton = ({ count = 6 }) => (
  <section style={{ padding: '72px 5% 100px', background: '#f8fafc' }}>
    <div style={{ marginBottom: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div className="es-sk" style={{ height: '12px', width: '80px', marginBottom: '10px' }} />
        <div className="es-sk" style={{ height: '40px', width: '220px' }} />
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
      {Array.from({ length: count }).map((_, i) => <SalonCardSkeleton key={i} />)}
    </div>
  </section>
);

/* ─────────────── Salon Detail Hero Skeleton ─────────────── */
export const SalonDetailHeroSkeleton = () => (
  <div className="es-sk" style={{ width: '100%', height: '600px', position: 'relative' }}>
    <div style={{
      position: 'absolute', bottom: '10%', left: '8%',
      display: 'flex', flexDirection: 'column', gap: '12px', width: '40%',
    }}>
      <div className="es-sk-dark" style={{ height: '12px', width: '120px' }} />
      <div className="es-sk-dark" style={{ height: '48px', width: '100%' }} />
      <div className="es-sk-dark" style={{ height: '2px', width: '60px' }} />
      <div className="es-sk-dark" style={{ height: '14px', width: '80%' }} />
    </div>
  </div>
);

/* ─────────────── Services Strip Skeleton ─────────────── */
export const ServicesStripSkeleton = () => (
  <div style={{ padding: '40px 5%', background: '#fff', display: 'flex', gap: '16px', overflowX: 'auto' }}>
    {[1, 2, 3, 4, 5, 6].map(i => (
      <div key={i} style={{ flexShrink: 0 }}>
        <div className="es-sk" style={{ width: '90px', height: '90px', borderRadius: '50%', marginBottom: '10px' }} />
        <div className="es-sk" style={{ height: '12px', width: '70px', margin: '0 auto' }} />
      </div>
    ))}
  </div>
);

/* ─────────────── Amenities Skeleton ─────────────── */
export const AmenitiesSkeleton = () => (
  <div style={{ padding: '60px 5%', background: '#f8f4f0' }}>
    <SectionHeaderSkeleton />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {[1, 2, 3, 4, 5, 6, 8].map(i => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', borderRadius: '12px', padding: '12px 20px' }}>
          <div className="es-sk" style={{ width: '28px', height: '28px', borderRadius: '8px' }} />
          <div className="es-sk" style={{ width: '80px', height: '14px' }} />
        </div>
      ))}
    </div>
  </div>
);

/* ─────────────── Gallery Skeleton ─────────────── */
export const GallerySkeleton = () => (
  <div style={{ padding: '60px 5%', background: '#fff' }}>
    <SectionHeaderSkeleton />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <div key={i} className="es-sk" style={{ height: i % 3 === 0 ? '240px' : '180px', borderRadius: '12px' }} />
      ))}
    </div>
  </div>
);

/* ─────────────── Review Skeleton ─────────────── */
export const ReviewSkeleton = () => (
  <div style={{ padding: '60px 5%', background: '#f8fafc' }}>
    <SectionHeaderSkeleton />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '24px', display: 'flex', gap: '16px' }}>
          <div className="es-sk" style={{ width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div className="es-sk" style={{ height: '16px', width: '30%', marginBottom: '8px' }} />
            <div className="es-sk" style={{ height: '12px', width: '20%', marginBottom: '12px' }} />
            <div className="es-sk" style={{ height: '13px', width: '100%', marginBottom: '6px' }} />
            <div className="es-sk" style={{ height: '13px', width: '85%' }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─────────────── Product Card Grid Skeleton ─────────────── */
export const ProductCardSkeleton = () => (
  <div style={{
    background: '#fff', borderRadius: '20px', overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(26,10,0,0.05)', border: '1px solid rgba(199,149,108,0.08)',
  }}>
    <div className="es-sk" style={{ height: '240px', borderRadius: 0 }} />
    <div style={{ padding: '20px' }}>
      <div className="es-sk" style={{ height: '11px', width: '40%', marginBottom: '8px' }} />
      <div className="es-sk" style={{ height: '16px', width: '75%', marginBottom: '8px' }} />
      <div className="es-sk" style={{ height: '13px', width: '95%', marginBottom: '6px' }} />
      <div className="es-sk" style={{ height: '13px', width: '70%', marginBottom: '14px' }} />
      <div className="es-sk" style={{ height: '24px', width: '90px', marginBottom: '14px' }} />
      <div className="es-sk" style={{ height: '42px', borderRadius: '12px' }} />
    </div>
  </div>
);

/* ─────────────── Product Grid Section Skeleton (with sidebar) ─────────────── */
export const ProductPageSkeleton = () => (
  <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
    {/* Sidebar */}
    <div style={{ width: '240px', flexShrink: 0, background: '#fff', padding: '32px 24px', borderRight: '1px solid rgba(199,149,108,0.1)' }}>
      <div className="es-sk" style={{ height: '24px', width: '70%', marginBottom: '24px' }} />
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ marginBottom: '20px' }}>
          <div className="es-sk" style={{ height: '12px', width: '80%', marginBottom: '12px' }} />
          {[1, 2, 3].map(j => <div key={j} className="es-sk" style={{ height: '12px', width: '60%', marginBottom: '8px' }} />)}
        </div>
      ))}
    </div>
    {/* Main */}
    <main style={{ flex: 1, padding: '40px 32px 80px' }}>
      <div className="es-sk" style={{ height: '36px', width: '220px', marginBottom: '32px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    </main>
  </div>
);

/* ─────────────── Product Detail Skeleton ─────────────── */
export const ProductDetailSkeleton = () => (
  <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '88px' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 32px 0' }}>
      <div className="es-sk" style={{ height: '14px', width: '140px' }} />
    </div>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 32px 80px' }}>
      <div style={{ display: 'flex', gap: '48px', background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(26,10,0,0.07)', border: '1px solid rgba(199,149,108,0.1)' }}>
        {/* Image col */}
        <div style={{ width: '50%', flexShrink: 0, padding: '32px 0 32px 32px' }}>
          <div className="es-sk" style={{ width: '100%', aspectRatio: '1', borderRadius: '16px', marginBottom: '16px' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
            {[1, 2, 3].map(i => <div key={i} className="es-sk" style={{ width: '70px', height: '70px', borderRadius: '12px' }} />)}
          </div>
        </div>
        {/* Info col */}
        <div style={{ flex: 1, padding: '40px 40px 40px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="es-sk" style={{ height: '28px', width: '80px', borderRadius: '30px' }} />
          <div className="es-sk" style={{ height: '44px', width: '80%' }} />
          <div className="es-sk" style={{ height: '13px', width: '100%' }} />
          <div className="es-sk" style={{ height: '13px', width: '90%' }} />
          <div className="es-sk" style={{ height: '13px', width: '70%' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1,2,3,4,5].map(i => <div key={i} className="es-sk" style={{ width: '18px', height: '18px', borderRadius: '3px' }} />)}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="es-sk" style={{ height: '42px', width: '110px' }} />
            <div className="es-sk" style={{ height: '42px', width: '80px' }} />
          </div>
          <div style={{ height: '1px', background: 'rgba(199,149,108,0.15)', margin: '4px 0' }} />
          <div className="es-sk" style={{ height: '14px', width: '70px', marginBottom: '8px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1.5px solid rgba(199,149,108,0.25)', borderRadius: '12px', overflow: 'hidden', width: 'fit-content' }}>
            <div className="es-sk" style={{ width: '44px', height: '44px', borderRadius: 0 }} />
            <div className="es-sk" style={{ width: '48px', height: '44px', borderRadius: 0 }} />
            <div className="es-sk" style={{ width: '44px', height: '44px', borderRadius: 0 }} />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <div className="es-sk" style={{ flex: 1, height: '52px', borderRadius: '14px' }} />
            <div className="es-sk" style={{ width: '56px', height: '56px', borderRadius: '14px' }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────── About Us Page Skeleton ─────────────── */
export const AboutPageSkeleton = () => (
  <>
    <PageTopBannerSkeleton height="380px" />
    <div style={{ padding: '80px 5%', background: '#fff' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="es-sk" style={{ height: '13px', width: '90px' }} />
          <div className="es-sk" style={{ height: '40px', width: '70%' }} />
          <div className="es-sk" style={{ height: '13px', width: '100%' }} />
          <div className="es-sk" style={{ height: '13px', width: '90%' }} />
          <div className="es-sk" style={{ height: '13px', width: '80%' }} />
        </div>
        <div className="es-sk" style={{ height: '360px', borderRadius: '20px' }} />
      </div>
    </div>
    <div style={{ padding: '80px 5%', background: '#f5f6fa' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        <div className="es-sk" style={{ height: '450px', borderRadius: '8px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <div className="es-sk" style={{ height: '18px', width: '50%' }} />
          <div className="es-sk" style={{ height: '36px', width: '60px' }} />
          <div className="es-sk" style={{ height: '13px', width: '85%' }} />
          <div className="es-sk" style={{ height: '13px', width: '90%' }} />
          <div className="es-sk" style={{ height: '13px', width: '80%' }} />
        </div>
      </div>
    </div>
    <div style={{ padding: '60px 5%', background: '#fff' }}>
      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ background: '#f8f4f0', borderRadius: '16px', padding: '28px 24px', flex: '0 0 200px' }}>
            <div className="es-sk" style={{ width: '48px', height: '48px', borderRadius: '12px', marginBottom: '14px' }} />
            <div className="es-sk" style={{ height: '18px', width: '70%', marginBottom: '8px' }} />
            <div className="es-sk" style={{ height: '13px', width: '90%' }} />
          </div>
        ))}
      </div>
    </div>
  </>
);

/* ─────────────── Contact Page Skeleton ─────────────── */
export const ContactPageSkeleton = () => (
  <div style={{ background: '#faf8f5' }}>
    {/* Info + Map box */}
    <div style={{
      display: 'flex', flexDirection: 'row', margin: '10% auto 4% auto', width: '80%',
      background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    }}>
      <div style={{ width: '50%', padding: '6% 6%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="es-sk" style={{ height: '28px', width: '80%', gridColumn: 'span 2' }} />
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="es-sk" style={{ height: '11px', width: '50%' }} />
            <div className="es-sk" style={{ height: '16px', width: '80%' }} />
          </div>
        ))}
      </div>
      <div className="es-sk" style={{ width: '50%', minHeight: '400px', borderRadius: 0 }} />
    </div>
    {/* Form box */}
    <div style={{
      display: 'flex', flexDirection: 'row', margin: '4% auto 10% auto', width: '80%',
      background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    }}>
      <div className="es-sk" style={{ width: '50%', height: '460px', borderRadius: 0 }} />
      <div style={{ width: '50%', padding: '6%', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div className="es-sk" style={{ height: '28px', width: '60%' }} />
        <div className="es-sk" style={{ height: '54px', width: '85%', borderRadius: '4px' }} />
        <div className="es-sk" style={{ height: '54px', width: '85%', borderRadius: '4px' }} />
        <div className="es-sk" style={{ height: '130px', width: '85%', borderRadius: '4px' }} />
        <div className="es-sk" style={{ height: '50px', width: '85%', borderRadius: '4px', marginTop: '8px' }} />
      </div>
    </div>
  </div>
);

/* ─────────────── Home Page Skeleton ─────────────── */
export const HomePageSkeleton = () => (
  <>
    <SkeletonStyles />
    <HeroSkeleton height="580px" />
    <StatsBarSkeleton />
    <SponsoredBannerSkeleton />
  </>
);

/* ─────────────── Job Seeker Card Skeleton ─────────────── */
export const JobSeekerCardSkeleton = () => (
  <div style={{
    background: '#fff',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(26,10,0,0.06)',
    display: 'flex',
    gap: '20px',
    border: '1px solid rgba(199,149,108,0.08)',
    overflow: 'hidden',
  }}>
    <div className="es-sk" style={{ width: 80, height: 80, borderRadius: '16px', flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <div className="es-sk" style={{ height: '18px', marginBottom: '10px', width: '60%' }} />
      <div className="es-sk" style={{ height: '13px', marginBottom: '8px', width: '40%' }} />
      <div className="es-sk" style={{ height: '13px', width: '80%' }} />
    </div>
  </div>
);

/* ─────────────── Job Seeker Page Skeleton ─────────────── */
export const JobSeekerPageSkeleton = () => (
  <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
    <SkeletonStyles />
    <PageTopBannerSkeleton height="320px" />
    <div style={{ padding: '60px 5% 100px' }}>
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="es-sk" style={{ height: '11px', width: '80px', marginBottom: '8px' }} />
          <div className="es-sk" style={{ height: '36px', width: '220px' }} />
        </div>
      </div>
      {/* Filter bar skeleton */}
      <div style={{ background: '#fff', borderRadius: '24px', padding: '20px 24px', marginBottom: '32px', display: 'flex', gap: '24px' }}>
        <div className="es-sk" style={{ height: '38px', width: '300px', borderRadius: '100px' }} />
        <div className="es-sk" style={{ height: '38px', width: '200px', borderRadius: '100px' }} />
      </div>
      {/* Cards list */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(540px, 1fr))', gap: '20px' }}>
        {[1, 2, 3, 4].map(i => <JobSeekerCardSkeleton key={i} />)}
      </div>
    </div>
  </div>
);

/* ─────────────── Job Seeker Detail Skeleton ─────────────── */
export const JobSeekerDetailSkeleton = () => (
  <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 5% 100px' }}>
    <SkeletonStyles />
    <div style={{ maxWidth: '1200px', margin: '0 auto 32px' }}>
      <div className="es-sk" style={{ height: '36px', width: '160px', borderRadius: '30px' }} />
    </div>
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
      {/* Left Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Main Profile Card */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '40px 32px', border: '1px solid rgba(199,149,108,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="es-sk" style={{ width: '140px', height: '140px', borderRadius: '28px', marginBottom: '20px' }} />
          <div className="es-sk" style={{ height: '12px', width: '100px', marginBottom: '8px' }} />
          <div className="es-sk" style={{ height: '32px', width: '200px', marginBottom: '8px' }} />
          <div className="es-sk" style={{ height: '16px', width: '150px', marginBottom: '20px' }} />
          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="es-sk" style={{ height: '28px', width: '80px', borderRadius: '100px' }} />
            <div className="es-sk" style={{ height: '28px', width: '120px', borderRadius: '100px' }} />
          </div>
        </div>
        {/* About Me Section */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid rgba(199,149,108,0.1)' }}>
          <div className="es-sk" style={{ height: '24px', width: '150px', marginBottom: '16px' }} />
          <div className="es-sk" style={{ height: '14px', width: '100%', marginBottom: '8px' }} />
          <div className="es-sk" style={{ height: '14px', width: '90%', marginBottom: '8px' }} />
          <div className="es-sk" style={{ height: '14px', width: '95%' }} />
        </div>
      </div>
      {/* Right Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Contact Details Card */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid rgba(199,149,108,0.1)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="es-sk" style={{ height: '24px', width: '160px', marginBottom: '8px' }} />
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
              <div className="es-sk" style={{ width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div className="es-sk" style={{ height: '10px', width: '40px', marginBottom: '6px' }} />
                <div className="es-sk" style={{ height: '14px', width: '70%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
