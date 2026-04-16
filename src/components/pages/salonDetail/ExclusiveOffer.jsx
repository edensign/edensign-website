/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useSelector } from 'react-redux';

const ExclusiveOffer = () => {
    const { salon } = useSelector(state => state.salonDetail);
    const services = salon?.services;

    // Static fallback service highlights shown even before services load
    const highlights = [
        { icon: '✦', label: 'Hair Studio' },
        { icon: '✦', label: 'Skincare' },
        { icon: '✦', label: 'Nail Art' },
        { icon: '✦', label: 'Bridal' },
        { icon: '✦', label: 'Makeup' },
    ];

    return (
        <section className="exclusive-offer-section">
            <span className="section-label">Exclusive Offer</span>
            <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 400,
                lineHeight: 1.15,
                color: '#1c1917',
                margin: '0 0 16px 0',
                letterSpacing: '-0.02em',
            }}>
                Find The Perfect Service
            </h2>
            <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                lineHeight: 1.8,
                color: '#78716c',
                maxWidth: '520px',
                margin: '0 0 40px 0',
                letterSpacing: '0.02em',
            }}>
                Explore our curated range of luxury beauty treatments crafted to enhance your natural radiance.
                Each service is tailored to your unique needs by our expert artisans.
            </p>

            {/* Highlight pills — always visible, no blank screen */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {(services && services.length > 0 ? services.slice(0, 6) : highlights).map((item, index) => (
                    <span
                        key={index}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 22px',
                            border: '1px solid rgba(201,169,110,0.35)',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '11px',
                            fontWeight: 500,
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            color: '#44403c',
                            background: 'rgba(201,169,110,0.05)',
                            transition: 'all 0.3s ease',
                            cursor: 'default',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(201,169,110,0.12)';
                            e.currentTarget.style.borderColor = '#c9a96e';
                            e.currentTarget.style.color = '#8b6914';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(201,169,110,0.05)';
                            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)';
                            e.currentTarget.style.color = '#44403c';
                        }}
                    >
                        <span style={{ color: '#c9a96e', fontSize: '8px' }}>✦</span>
                        {item.name || item.label}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default ExclusiveOffer;
