/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const TYPE_LABELS = {
    front:                  'Salon Exterior',
    last_full_salon:        'Full Salon View',
    service_chair:          'Service Chairs',
    reception:              'Reception',
    shampoo_chair:          'Shampoo Chairs',
    pedi_chair:             'Pedi Chairs',
    nail_art:               'Nail Art',
    facial_bed:             'Facial Bed',
    product_display:        'Products & Display',
    selfie_point:           'Selfie Point',
    other_service_customer: 'Other Pics',
    videos:                 'Videos',
    work_video:             'Work Video',
};

const S3_BASE = 'https://salon-s3.s3.us-east-1.amazonaws.com';

const buildUrl = (img) =>
    `${S3_BASE}/eden-sign/salon/${img.type || 'front'}/${img.image_src}`;

const SalonGallery = () => {
    const { images } = useSelector(state => state.salonDetail);
    const [lightboxIndex, setLightboxIndex] = useState(null);
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

    // If there is only 1 image in the filtered list, fallback to validImages to allow slideshow navigation
    const activeList = filtered.length > 1 ? filtered : validImages;

    // Keyboard navigation for Lightbox
    useEffect(() => {
        if (lightboxIndex === null) return;
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                setLightboxIndex((prev) => (prev - 1 + activeList.length) % activeList.length);
            } else if (e.key === 'ArrowRight') {
                setLightboxIndex((prev) => (prev + 1) % activeList.length);
            } else if (e.key === 'Escape') {
                setLightboxIndex(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, activeList.length]);

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
                                onClick={() => {
                                    setActiveFilter(t);
                                    setLightboxIndex(null); // Reset lightbox on filter change
                                }}
                            >
                                {t === 'all' ? 'All Photos' : (TYPE_LABELS[t] || t)}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Masonry grid */}
            <div className="sg-grid">
                {filtered.map((img, i) => {
                    const activeIndex = activeList.indexOf(img);
                    return (
                        <div
                            key={img.id || i}
                            className="sg-item"
                            onClick={() => setLightboxIndex(activeIndex !== -1 ? activeIndex : 0)}
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
                    );
                })}
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && activeList[lightboxIndex] && (
                <div className="sg-lightbox" onClick={() => setLightboxIndex(null)}>
                    <button className="sg-lightbox-close" onClick={() => setLightboxIndex(null)}>✕</button>
                    
                    {activeList.length > 1 && (
                        <>
                            <button
                                className="sg-lightbox-prev"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex((prev) => (prev - 1 + activeList.length) % activeList.length);
                                }}
                            >
                                ‹
                            </button>
                            <button
                                className="sg-lightbox-next"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex((prev) => (prev + 1) % activeList.length);
                                }}
                            >
                                ›
                            </button>
                        </>
                    )}

                    <img
                        src={buildUrl(activeList[lightboxIndex])}
                        alt={TYPE_LABELS[activeList[lightboxIndex].type] || activeList[lightboxIndex].type || 'Salon photo'}
                        onClick={e => e.stopPropagation()}
                    />
                    {(TYPE_LABELS[activeList[lightboxIndex].type] || activeList[lightboxIndex].type) && (
                        <p className="sg-lightbox-caption">
                            {TYPE_LABELS[activeList[lightboxIndex].type] || activeList[lightboxIndex].type}
                        </p>
                    )}
                </div>
            )}
        </section>
    );
};

export default SalonGallery;
