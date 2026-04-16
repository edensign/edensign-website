/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import videoImg from "../../assets/video.png";
import video from "../../assets/salon_working.mp4";

const VideoSection = () => {
    return (
        <div className="video-section">
            {/* Left text panel */}
            <div className="video-text-panel">
                <span className="section-label" style={{ color: '#c9a96e' }}>
                    Luxury Salon
                </span>

                <h2 className="section-heading section-heading-light" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
                    Get Cozy &amp; Unwind
                </h2>

                <p>
                    Welcome to our exquisite luxury salon, where indulgence meets elegance
                    in every detail. As you step into our opulent sanctuary, you'll be
                    enveloped in an atmosphere of refined sophistication and unparalleled comfort.
                </p>

                <a
                    href={video}
                    target="_blank"
                    rel="noreferrer"
                    className="video-discover-btn"
                    style={{ textDecoration: 'none' }}
                >
                    <span>▶</span>
                    <span>Watch Our Story</span>
                </a>

                {/* Decorative accent */}
                <div style={{
                    position: 'absolute',
                    bottom: '32px',
                    left: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.25)',
                }}>
                    <span style={{ width: '20px', height: '1px', background: 'rgba(201,169,110,0.4)' }} />
                    Eden Sign Studio
                </div>
            </div>

            {/* Right video / image panel */}
            <div className="video-media-panel">
                <img src={videoImg} alt="Salon interior preview" />

                <a
                    href={video}
                    target="_blank"
                    rel="noreferrer"
                    className="video-play-overlay"
                    style={{ textDecoration: 'none' }}
                >
                    <div className="video-play-btn">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default VideoSection;
