/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React from 'react';
import { useSelector } from 'react-redux';

import salonImg from "../../assets/salon-detail.png";

const AmenitiesComponent = () => {
    const { salon } = useSelector(state => state.salonDetail);

    const amenities = salon?.amenities;

    // Don't render an empty dark block while data loads
    if (!amenities || amenities.length === 0) return null;

    const leftAmenities  = amenities.slice(0, 3);
    const rightAmenities = amenities.slice(3, 6);

    return (
        <section className="amenities-section">
            {/* Section header */}
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <span className="section-label" style={{ justifyContent: 'center', color: 'var(--es-cream)' }}>
                    Our Facilities
                </span>
                <h2 className="section-heading section-heading-light">
                    Premium Amenities
                </h2>
            </div>

            {/* Three-column grid — CSS @keyframes handle slide-in, no JS needed */}
            <div className="amenities-grid">

                {/* ── Left column ── */}
                <div className="facilities-list-left">
                    {leftAmenities.map((amenity, index) => (
                        <div
                            key={index}
                            className="amenity-item"
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            <div className="amenity-name">{amenity.name}</div>
                            {amenity.description && (
                                <div className="amenity-desc">{amenity.description}</div>
                            )}
                        </div>
                    ))}
                </div>

                {/* ── Centre image ── */}
                <div className="facilities-img-box" style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={salonImg}
                        alt="Salon interior"
                        className="amenities-center-img"
                    />
                </div>

                {/* ── Right column ── */}
                <div className="facilities-list-right">
                    {rightAmenities.map((amenity, index) => (
                        <div
                            key={index}
                            className="amenity-item amenity-item-right"
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            <div className="amenity-name">{amenity.name}</div>
                            {amenity.description && (
                                <div className="amenity-desc">{amenity.description}</div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AmenitiesComponent;
