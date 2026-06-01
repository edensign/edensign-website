/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useState } from 'react';
import { useSelector } from 'react-redux';

const TYPE_LABELS = {
    front:            'Salon Exterior',
    last_full_salon:  'Full Salon View',
    service_chair:    'Service Chairs',
    reception:        'Reception',
    product_display:  'Products & Display',
    work_video:       'Work Video',
};

const S3_BASE = 'https://salon-s3.s3.us-east-1.amazonaws.com';

const buildUrl = (img) =>
    `${S3_BASE}/eden-sign/salon/${img.type || 'front'}/${img.image_src}`;

const SalonGallery = () => {
    const { images } = useSelector(state => state.salonDetail);
    const [lightbox, setLightbox] = useState(null); // { src, alt }
    const [activeFilter, setActiveFilter] = useState('all');

    if (!images || images.length === 0) return null;

    // Only include objects with image_src (skip legacy strings)
    const validImages = images.filter(img => img && img.image_src);
    if (validImages.length === 0) return null;

    // Collect unique types in this salon's images
    const types = ['all', ...new Set(validImages.map(img => img.type || 'front'))];

    const filtered = activeFilter === 'all'
        ? validImages
        : validImages.filter(img => (img.type || 'front') === activeFilter);

    return (
        <section className="sg-section">
            {/* Header */}
            <div className="sg-header">
                <span className="sg-label">Explore the Space</span>
                <h2 className="sg-title">Salon Gallery</h2>
                <p className="sg-subtitle">
                    A glimpse into our world — every corner crafted with care.
                </p>

                {/* Filter tabs */}
                {types.length > 2 && (
                    <div className="sg-filters">
                        {types.map(t => (
                            <button
                                key={t}
                                className={`sg-filter-btn${activeFilter === t ? ' sg-filter-active' : ''}`}
                                onClick={() => setActiveFilter(t)}
                            >
                                {t === 'all' ? 'All Photos' : (TYPE_LABELS[t] || t)}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Masonry grid */}
            <div className="sg-grid">
                {filtered.map((img, i) => (
                    <div
                        key={img.id || i}
                        className={`sg-item${i % 5 === 0 ? ' sg-item-wide' : ''}`}
                        onClick={() => setLightbox({ src: buildUrl(img), alt: TYPE_LABELS[img.type] || img.type })}
                    >
                        <img
                            src={buildUrl(img)}
                            alt={TYPE_LABELS[img.type] || img.type || 'Salon photo'}
                            loading="lazy"
                        />
                        <div className="sg-item-overlay">
                            <span className="sg-item-type">
                                {TYPE_LABELS[img.type] || img.type || 'Salon'}
                            </span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div className="sg-lightbox" onClick={() => setLightbox(null)}>
                    <button className="sg-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
                    <img
                        src={lightbox.src}
                        alt={lightbox.alt}
                        onClick={e => e.stopPropagation()}
                    />
                    {lightbox.alt && (
                        <p className="sg-lightbox-caption">{lightbox.alt}</p>
                    )}
                </div>
            )}
        </section>
    );
};

export default SalonGallery;
