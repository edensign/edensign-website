/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * ActiveOffersSection — embeds on Homepage and Salon Detail Page.
 * Fetches live offer cards, renders them, handles claim flow.
 */

import React, { useState, useEffect, useCallback } from "react";
import "./ActiveOffersSection.css";
import PremiumOfferCard from "../common/PremiumOfferCard";
import ClaimOfferModal from "../common/ClaimOfferModal";
import API from "../../apis";
import { useToast } from "../common/Toast";
import { useNavigate } from "react-router-dom";

const OfferCardSkeleton = () => (
    <div className="aos-skeleton">
        <div className="aos-skeleton__top" />
        <div className="aos-skeleton__line aos-skeleton__line--lg" />
        <div className="aos-skeleton__line" />
        <div className="aos-skeleton__line aos-skeleton__line--sm" />
        <div className="aos-skeleton__bottom" />
    </div>
);

/**
 * Props:
 *  - salonId: optional number — if given, only loads offers for that salon
 *  - title: optional string override for section heading
 */
const ActiveOffersSection = ({ salonId = null, title = "Exclusive Digital Offers" }) => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [claimTarget, setClaimTarget] = useState(null);   // offer being claimed
    const [claimedCard, setClaimedCard] = useState(null);   // successfully claimed card data
    const [showSuccess, setShowSuccess] = useState(false);

    const fetchOffers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await API.DigitalOfferAPI.getPublicOffers(salonId);
            if (response.status === "Success") {
                setOffers(response.data.rows || []);
            } else {
                setOffers([]);
            }
        } catch {
            setOffers([]);
        } finally {
            setLoading(false);
        }
    }, [salonId]);

    useEffect(() => { fetchOffers(); }, [fetchOffers]);

    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleClaim = (offer) => {
        const token = API.CustomerAPI.getToken();
        if (!token) {
            showToast("Please log in to claim an offer card.", "warning", "Login", () => navigate("/login"));
            return;
        }
        setClaimTarget(offer);
    };

    const handleClaimSuccess = (cardData) => {
        setClaimTarget(null);
        setClaimedCard(cardData);
        setShowSuccess(true);
        showToast("Offer card claimed successfully!", "success");
    };

    if (!loading && offers.length === 0) return null;

    return (
        <section className="aos-section">
            <div className="aos-header">
                <div className="aos-header__line" />
                <div className="aos-header__text">
                    <span className="aos-header__ornament">✦</span>
                    <h2 className="aos-title">{title}</h2>
                    <span className="aos-header__ornament">✦</span>
                </div>
                <div className="aos-header__line" />
            </div>
            <p className="aos-subtitle">
                Book your first appointment and unlock exclusive digital offer cards.
            </p>

            <div className="aos-grid">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => <OfferCardSkeleton key={i} />)
                ) : (
                    offers.map((offer) => (
                        <PremiumOfferCard
                            key={offer.id}
                            offer={offer}
                            cardData={null}
                            showClaimButton={true}
                            onClaim={handleClaim}
                        />
                    ))
                )}
            </div>

            {/* Claim Modal */}
            {claimTarget && (
                <ClaimOfferModal
                    offer={claimTarget}
                    onClose={() => setClaimTarget(null)}
                    onSuccess={handleClaimSuccess}
                />
            )}

            {/* Success Flow — show the generated card */}
            {showSuccess && claimedCard && (
                <div className="aos-success-overlay" onClick={() => setShowSuccess(false)}>
                    <div className="aos-success-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="aos-success-header">
                            <div className="aos-success-emoji">🎉</div>
                            <h2 className="aos-success-title">Your Card is Ready!</h2>
                            <p className="aos-success-sub">
                                Card ID: <strong>{claimedCard.card_id}</strong>
                            </p>
                        </div>
                        <PremiumOfferCard
                            offer={offers.find(o => o.id === claimedCard.offer_id) || {}}
                            cardData={claimedCard}
                            showClaimButton={false}
                        />
                        <div className="aos-success-actions">
                            <button
                                className="aos-success-btn"
                                onClick={() => setShowSuccess(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ActiveOffersSection;
