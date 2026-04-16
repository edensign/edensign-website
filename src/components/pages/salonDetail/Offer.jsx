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

            <div className="offer-stats">
                <div>
                    <div className="offer-stat-number">500<span style={{ fontSize: '1.4rem', color: '#c9a96e' }}>+</span></div>
                    <div className="offer-stat-label">Happy Clients</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(201,169,110,0.2)' }} />
                <div>
                    <div className="offer-stat-number">12<span style={{ fontSize: '1.4rem', color: '#c9a96e' }}>+</span></div>
                    <div className="offer-stat-label">Expert Artists</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(201,169,110,0.2)' }} />
                <div>
                    <div className="offer-stat-number">8<span style={{ fontSize: '1.4rem', color: '#c9a96e' }}>+</span></div>
                    <div className="offer-stat-label">Years Experience</div>
                </div>
            </div>
        </section>
    );
};

export default Offer;
