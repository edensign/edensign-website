/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useSelector } from 'react-redux';

const Offer = () => {
    const { salon } = useSelector(state => state.salonDetail);

    // Don't render a large blank section if data isn't loaded yet
    if (!salon || !salon.name) return null;

    // ── Dynamic stats derived from salon data ──
    const happyClients = salon.occupancy ? salon.occupancy * 50 : null;
    const expertArtists = salon.staff_count || null;
    const yearsExperience = salon.established_on
        ? new Date().getFullYear() - new Date(salon.established_on).getFullYear()
        : null;

    const stats = [
        happyClients   && { value: happyClients,    label: 'Happy Clients' },
        expertArtists  && { value: expertArtists,   label: 'Expert Artists' },
        yearsExperience && { value: yearsExperience, label: 'Years Experience' },
    ].filter(Boolean);

    return (
        <section className="offer-section">
            {/* decorative top line drawn in CSS via ::before */}

            <span className="section-label" style={{ justifyContent: 'center' }}>
                Where Beauty Meets Artistry
            </span>

            <h1 className="bigger-text">
                Welcome to {salon.name}
            </h1>

            {salon.description && (
                <p className="offer-desc">{salon.description}</p>
            )}

            {stats.length > 0 && (
                <div className="offer-stats">
                    {stats.map((stat, i) => (
                        <>
                            {i > 0 && (
                                <div key={`sep-${i}`} style={{ width: '1px', background: 'rgba(201,169,110,0.2)' }} />
                            )}
                            <div key={stat.label}>
                                <div className="offer-stat-number">
                                    {stat.value}
                                    <span style={{ fontSize: '1.4rem', color: '#c9a96e' }}>+</span>
                                </div>
                                <div className="offer-stat-label">{stat.label}</div>
                            </div>
                        </>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Offer;

