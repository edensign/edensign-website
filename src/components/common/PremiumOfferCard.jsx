/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * Premium Digital Offer Card — Front / Inside / Back flip animation.
 * Dark gold luxury salon theme.
 */

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./PremiumOfferCard.css";

const DEFAULT_LOGO = "✦";

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const CountdownBadge = ({ validTill }) => {
    const now = new Date();
    const expiry = new Date(validTill);
    const diffMs = expiry - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffMs < 0) return <span className="poc-badge poc-badge--expired">Expired</span>;
    if (diffDays <= 3) return <span className="poc-badge poc-badge--urgent">{diffDays}d left</span>;
    return <span className="poc-badge poc-badge--active">{diffDays} days left</span>;
};

/**
 * PremiumOfferCard
 *
 * Props:
 *  - offer: object from digital_offers table
 *  - cardData: object from user_offer_cards (if claimed)
 *  - onClaim: callback when user clicks "Claim Offer"
 *  - showClaimButton: bool
 */
const PremiumOfferCard = ({ offer, cardData, onClaim, showClaimButton = true }) => {
    const [face, setFace] = useState("front"); // "front" | "inside" | "back"
    const cardRef = useRef(null);

    const services = offer?.services || [];
    const salon = offer?.salon || {};
    const validTill = cardData?.valid_till || null;
    const status = cardData?.status || null;

    const cycleCard = () => {
        setFace((f) => (f === "front" ? "inside" : f === "inside" ? "back" : "front"));
    };

    const statusLabel = {
        active: <span className="poc-status poc-status--active">● Active</span>,
        expired: <span className="poc-status poc-status--expired">● Expired</span>,
        used: <span className="poc-status poc-status--used">● Used</span>,
    }[status] || null;

    const handleDownload = async () => {
        if (!cardRef.current) return;
        
        // Temporarily force show the back face for download if it's a claimed card
        const originalFace = face;
        setFace("back");

        // Wait for state update and rendering
        setTimeout(async () => {
            try {
                const canvas = await html2canvas(cardRef.current, {
                    backgroundColor: "#0a0909",
                    scale: 2, // High quality
                    useCORS: true,
                    logging: false,
                });
                const link = document.createElement("a");
                link.download = `EdenSign-Card-${cardData?.card_id || 'Offer'}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
            } catch (err) {
                console.error("Download failed:", err);
                alert("Failed to download card. Please try again.");
            } finally {
                setFace(originalFace);
            }
        }, 300);
    };

    return (
        <div className="poc-wrapper">
            {/* Navigation dots */}
            <div className="poc-nav">
                {["front", "inside", "back"].map((f) => (
                    <button
                        key={f}
                        className={`poc-nav-dot ${face === f ? "poc-nav-dot--active" : ""}`}
                        onClick={() => setFace(f)}
                        aria-label={f}
                    />
                ))}
            </div>

            <div
                className="poc-card"
                ref={cardRef}
                data-face={face}
                onClick={cycleCard}
            >
                {/* ─────────────── FRONT ─────────────── */}
                <div className={`poc-face poc-front ${face === "front" ? "poc-face--active" : ""}`}>
                    <div className="poc-front__shimmer" />
                    <div className="poc-front__top">
                        <div className="poc-logo">{offer?.logo_url
                            ? <img src={offer.logo_url} alt="salon logo" />
                            : <span>{DEFAULT_LOGO}</span>}
                        </div>
                        <div className="poc-front__corner-ornament">✦</div>
                    </div>
                    <div className="poc-front__body">
                        <p className="poc-front__salon-name">{salon.name || "Glam Up Studio"}</p>
                        <h2 className="poc-front__title">{offer?.title || "Exclusive Offer"}</h2>
                        <div className="poc-front__divider">
                            <span>✦</span>
                        </div>
                        {offer?.price && (
                            <div className="poc-front__price">
                                <span className="poc-price-value">₹ {Number(offer.price).toLocaleString()}</span>
                            </div>
                        )}
                    </div>
                    <div className="poc-front__footer">
                        <span className="poc-front__tap">Tap to open →</span>
                        {validTill && <CountdownBadge validTill={validTill} />}
                    </div>
                    {/* Corner gold ornaments */}
                    <span className="poc-corner poc-corner--tl">◈</span>
                    <span className="poc-corner poc-corner--tr">◈</span>
                    <span className="poc-corner poc-corner--bl">◈</span>
                    <span className="poc-corner poc-corner--br">◈</span>
                </div>

                {/* ─────────────── INSIDE ─────────────── */}
                <div className={`poc-face poc-inside ${face === "inside" ? "poc-face--active" : ""}`}>
                    <div className="poc-inside__left">
                        <h3 className="poc-inside__section-title">Services Included</h3>
                        <ul className="poc-inside__services">
                            {services.length > 0 ? services.map((s, i) => (
                                <li key={i} className="poc-inside__service-item">
                                    <span className="poc-check">✔</span>
                                    {typeof s === "object" ? s.name : s}
                                </li>
                            )) : (
                                <li className="poc-inside__service-item poc-muted">No services listed</li>
                            )}
                        </ul>
                    </div>
                    <div className="poc-inside__divider-v" />
                    <div className="poc-inside__right">
                        <h3 className="poc-inside__section-title">Exclusive Deals</h3>
                        <div className="poc-discounts">
                            {offer?.discount_percentage && (
                                <div className="poc-discount-badge">
                                    <span className="poc-discount-pct">{offer.discount_percentage}%</span>
                                    <span className="poc-discount-label">OFF</span>
                                </div>
                            )}
                            {offer?.discount_amount && (
                                <div className="poc-discount-badge poc-discount-badge--flat">
                                    <span className="poc-discount-pct">Rs.{Number(offer.discount_amount).toLocaleString()}</span>
                                    <span className="poc-discount-label">FLAT OFF</span>
                                </div>
                            )}
                            {!offer?.discount_percentage && !offer?.discount_amount && (
                                <p className="poc-muted" style={{ textAlign: "center", padding: "8px" }}>See T&amp;C for details</p>
                            )}
                        </div>
                        {offer?.price && (
                            <div className="poc-inside__price-box">
                                <span className="poc-inside__price-label">Card Value</span>
                                <span className="poc-inside__price-value">Rs. {Number(offer.price).toLocaleString()}</span>
                            </div>
                        )}
                        {offer?.terms && (
                            <div className="poc-inside__terms">
                                <p className="poc-inside__terms-title">T&amp;C</p>
                                <p className="poc-inside__terms-text">{offer.terms}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ─────────────── BACK ─────────────── */}
                <div className={`poc-face poc-back ${face === "back" ? "poc-face--active" : ""}`}>
                    <div className="poc-back__header">
                        <div className="poc-back__title-row">
                            <span className="poc-back__ornament">✦</span>
                            <h2 className="poc-back__card-title">{offer?.title}</h2>
                            <span className="poc-back__ornament">✦</span>
                        </div>
                        {cardData?.card_id && (
                            <div className="poc-back__card-id">ID: {cardData.card_id}</div>
                        )}
                        {statusLabel}
                    </div>

                    <div className="poc-back__body">
                        {cardData?.customer_name && (
                            <div className="poc-back__field">
                                <span className="poc-back__field-label">Customer</span>
                                <span className="poc-back__field-value">{cardData.customer_name}</span>
                            </div>
                        )}
                        {cardData?.customer_phone && (
                            <div className="poc-back__field">
                                <span className="poc-back__field-label">Phone</span>
                                <span className="poc-back__field-value">{cardData.customer_phone}</span>
                            </div>
                        )}
                        {cardData?.customer_address && (
                            <div className="poc-back__field">
                                <span className="poc-back__field-label">Address</span>
                                <span className="poc-back__field-value">{cardData.customer_address}</span>
                            </div>
                        )}
                    </div>

                    {validTill && (
                        <div className="poc-back__validity">
                            <span className="poc-back__validity-label">VALID TILL</span>
                            <span className="poc-back__validity-date">{formatDate(validTill)}</span>
                        </div>
                    )}

                    <div className="poc-back__salon-info">
                        {salon.name && <p className="poc-back__salon-name">{salon.name}</p>}
                        {salon.phone && <p className="poc-back__salon-contact">{salon.phone}</p>}
                        {salon.email && <p className="poc-back__salon-contact">{salon.email}</p>}
                    </div>

                    {/* QR Placeholder */}
                    <div className="poc-qr-box">
                        <div className="poc-qr-inner">
                            {cardData?.card_id ? (
                                <div className="poc-qr-placeholder">
                                    <div className="poc-qr-grid">
                                        {Array.from({ length: 25 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="poc-qr-cell"
                                                style={{ opacity: Math.random() > 0.4 ? 1 : 0.1 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="poc-qr-unclaimed">⊞<br /><small>QR on claim</small></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="poc-actions">
                {showClaimButton && !cardData && status !== "used" && (
                    <button className="poc-btn poc-btn--claim" onClick={(e) => { e.stopPropagation(); onClaim && onClaim(offer); }}>
                        🎉 Claim This Offer
                    </button>
                )}
                {cardData && (
                    <button
                        className="poc-btn poc-btn--download"
                        onClick={(e) => { e.stopPropagation(); handleDownload(); }}
                    >
                        ↓ Download Card
                    </button>
                )}
            </div>
        </div>
    );
};

export default PremiumOfferCard;
