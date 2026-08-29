/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * ClaimOfferModal — appears after first booking or when customer
 * clicks "Claim This Offer" on a card.
 */

import React, { useState } from "react";
import "./ClaimOfferModal.css";
import API from "../../apis";

const ClaimOfferModal = ({ offer, onClose, onSuccess }) => {
    const customer = API.CustomerAPI.getCustomer();
    const [form, setForm] = useState({
        customer_name: customer?.name || "",
        customer_address: customer?.address || "",
        customer_phone: customer?.contact_no || ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const token = API.CustomerAPI.getToken();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.customer_name || !form.customer_phone) {
            setError("Name and phone number are required.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const response = await API.DigitalOfferAPI.claimOffer(
                { ...form, offer_id: offer.id },
                token
            );
            if (response.status === "Success") {
                onSuccess && onSuccess(response.data);
            } else {
                setError(response.msg || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Failed to claim offer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="com-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="com-modal">
                <div className="com-modal__shimmer" />

                <button className="com-close-btn" onClick={onClose} aria-label="Close">✕</button>

                <div className="com-header">
                    <span className="com-ornament">✦</span>
                    <h2 className="com-title">Claim Your Offer Card</h2>
                    <span className="com-ornament">✦</span>
                </div>
                <p className="com-subtitle">
                    Fill in your details to generate your personalized digital offer card.
                </p>

                <div className="com-offer-summary">
                    <span className="com-offer-name">{offer?.title}</span>
                    {offer?.price && (
                        <span className="com-offer-price">Rs. {Number(offer.price).toLocaleString()}</span>
                    )}
                </div>

                <form className="com-form" onSubmit={handleSubmit}>
                    <div className="com-field">
                        <label className="com-label" htmlFor="claim-name">Full Name *</label>
                        <input
                            id="claim-name"
                            className="com-input"
                            type="text"
                            name="customer_name"
                            placeholder="e.g. Ayesha Khan"
                            value={form.customer_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="com-field">
                        <label className="com-label" htmlFor="claim-phone">Phone Number *</label>
                        <input
                            id="claim-phone"
                            className="com-input"
                            type="tel"
                            name="customer_phone"
                            placeholder="e.g. +92 300 1234567"
                            value={form.customer_phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="com-field">
                        <label className="com-label" htmlFor="claim-address">Address</label>
                        <input
                            id="claim-address"
                            className="com-input"
                            type="text"
                            name="customer_address"
                            placeholder="Street, City"
                            value={form.customer_address}
                            onChange={handleChange}
                        />
                    </div>

                    {error && <p className="com-error">{error}</p>}

                    <button
                        type="submit"
                        className="com-submit-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="com-spinner" />
                        ) : (
                            "🎉 Generate My Card"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClaimOfferModal;
