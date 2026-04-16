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

    return (
        <header className="salon-hero-wrapper">
            {/* Background image slides — blurred behind the carousel */}
            {images?.map((image, index) => (
                <div
                    className='big-sliding'
                    key={index}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        transition: 'all 1s ease-in',
                        filter: 'blur(10px)',
                        zIndex: 1,
                    }}
                >
                    <img
                        src={`https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/salon/normal/${image}`}
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
            <div className="salon-hero-content">
                <div className="salon-hero-badge">Premium Beauty Destination</div>

                <h1 className="salon-hero-title">
                    {salon?.name || 'Luxury Salon Experience'}
                </h1>

                <div className="salon-hero-divider" />

                <div className="salon-hero-meta">
                    {salon?.location && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            {salon.location}
                        </span>
                    )}
                    {salon?.rating && (
                        <>
                            <span style={{ color: 'rgba(255,255,255,0.25)' }}>|</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="#c9a96e">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                </svg>
                                {salon.rating} Rating
                            </span>
                        </>
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
