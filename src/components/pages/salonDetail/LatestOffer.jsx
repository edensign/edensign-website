/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

const LatestOffer = () => {
    return (
        <section className="latest-offer-section">
            <span className="section-label" style={{ justifyContent: 'center', color: '#c9a96e' }}>
                Browse Through
            </span>
            <h2 className="section-heading section-heading-light">
                Our Latest Offers
            </h2>
            <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.45)',
                maxWidth: '480px',
                margin: '0 auto',
                letterSpacing: '0.02em',
            }}>
                Handpicked seasonal promotions and exclusive deals curated just for you.
                Scroll through and discover savings on our most loved treatments.
            </p>

            {/* Decorative gold rule */}
            <div style={{
                width: '48px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, #c9a96e, transparent)',
                margin: '32px auto 0',
            }} />
        </section>
    );
};

export default LatestOffer;
