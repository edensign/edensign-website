/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useSelector } from 'react-redux';
import SmallCarousel from './SmallCarousel';

const DetailPageTop = () => {
    const { salon, images } = useSelector(state => state.salonDetail);

    const S3_BASE = import.meta.env.VITE_S3_BASE_URL || 'https://salon-s3.s3.us-east-1.amazonaws.com';

    // Use "last_full_salon" for hero background; fall back to front → any
    const fullSalonImages = images?.filter(img => img && img.image_src && img.type === 'last_full_salon');
    const frontFallback = images?.filter(img => img && img.image_src && img.type === 'front');
    const bgImages = fullSalonImages?.length > 0
        ? fullSalonImages
        : frontFallback?.length > 0
            ? frontFallback
            : (images?.filter(img => img && img.image_src)?.length > 0
                ? images?.filter(img => img && img.image_src)
                : [{ type: 'front', image_src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', isFallback: true }]);

    return (
        <header className="salon-hero-wrapper">
            {/* Background image slides — blurred behind the carousel */}
            {bgImages?.map((image, index) => (
                <div
                    className='big-sliding'
                    key={index}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        transition: 'all 1s ease-in',
                        filter: 'blur(1.5px)',
                        zIndex: 1,
                    }}
                >
                    <img
                        src={image.isFallback ? image.image_src : `${S3_BASE}/eden-sign/salon/${image.type || 'front'}/${image.image_src}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        alt="Salon background"
                    />
                </div>
            ))}

            {/* Dark gradient overlay */}
            <div className="salon-hero-overlay" />

            {/* Main sharpened carousel (small slider) */}
            <SmallCarousel />

            {/* Hero text pinned to bottom-left */}
            <div className="salon-hero-content" style={{ bottom: '12%', left: '8%' }}>
                <div className="salon-hero-badge" style={{ fontSize: '12px', letterSpacing: '0.15em', fontWeight: 600, color: '#ffffff' }}>
                    ★ {salon?.rating ? parseFloat(salon?.rating).toFixed(1) : '4.9'} / 5.0 • Exceptional Destination
                </div>

                <h1 className="salon-hero-title" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontFamily: 'Playfair Display, serif', fontWeight: 600, margin: '12px 0' }}>
                    {salon?.name || 'Lumière Salon'}
                </h1>

                <div className="salon-hero-divider" style={{ width: '80px', height: '2px', background: 'var(--es-emerald)', margin: '16px 0' }} />

                <div className="salon-hero-meta" style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    {salon?.location && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                            {salon.location}
                        </span>
                    )}
                    {salon?.contact_number && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.01-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            {salon.contact_number}
                        </span>
                    )}
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute',
                bottom: '32px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                animation: 'none',
            }}>
                <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '9px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                }}>Scroll</span>
                <div style={{
                    width: '1px',
                    height: '40px',
                    background: 'linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)',
                }} />
            </div>
        </header>
    );
};

export default DetailPageTop;
