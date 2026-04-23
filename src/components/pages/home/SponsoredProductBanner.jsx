import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../../../apis';
import './sponsored-banner.css';
import placeholder from "../../assets/products/foundation.jpg"; // fallback image

const SponsoredProductBanner = () => {
    const [ads, setAds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const res = await API.ProductAdAPI.getSponsored();
                if (res && res.status === 'Success' && res.data.length > 0) {
                    setAds(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch sponsored ads:", err);
            }
        };
        fetchAds();
    }, []);

    const handleAdClick = async (adId, productId) => {
        try {
            await API.ProductAdAPI.trackClick(adId);
        } catch (e) {
            console.error("Tracking error", e);
        }
        navigate(`/product/${productId}`);
    };

    if (!ads || ads.length === 0) return null;

    const heroAd = ads[0];
    const otherAds = ads.slice(1);

    return (
        <section className="sponsored-banner-section">
            <div className="sponsored-banner-container">
                <motion.div 
                    className="sponsored-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p>Exclusive Picks</p>
                    <h2>Featured Products</h2>
                </motion.div>

                <div className="sponsored-grid">
                    <motion.div 
                        className="sponsored-hero-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        onClick={() => handleAdClick(heroAd.ad_id, heroAd.product_id || heroAd.id)}
                    >
                        <div className="sponsored-hero-image">
                            <img src={heroAd.image_src || placeholder} alt={heroAd.title} />
                        </div>
                        <div className="sponsored-hero-content">
                            <span className="sponsored-badge">Sponsored Top Pick</span>
                            <h3>{heroAd.title}</h3>
                            <h4>{heroAd.subtitle || heroAd.brand || 'Premium Quality'}</h4>
                            <div className="price" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                {heroAd.discounted_price ? (
                                    <>
                                        <span style={{ textDecoration: 'line-through', color: '#888', opacity: 0.6 }}>
                                            Rs. {heroAd.price}
                                        </span>
                                        <span style={{ color: '#c7956c' }}>Rs. {heroAd.discounted_price}</span>
                                    </>
                                ) : (
                                    <span style={{ color: '#c7956c' }}>Rs. {heroAd.price || 'Contact for Price'}</span>
                                )}
                            </div>
                            <button className="shop-now-btn">Explore Details</button>
                        </div>
                    </motion.div>

                    {otherAds.length > 0 && (
                        <div className="sponsored-sidebar">
                            {otherAds.map((ad, index) => (
                                <motion.div 
                                    key={ad.ad_id} 
                                    className="sponsored-small-card"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                                    onClick={() => handleAdClick(ad.ad_id, ad.product_id || ad.id)}
                                >
                                    <img src={ad.image_src || placeholder} alt={ad.title} className="sponsored-small-img" />
                                    <div className="sponsored-small-content">
                                        <h5 className="sponsored-small-title">{ad.title}</h5>
                                        <p className="sponsored-small-subtitle">{ad.subtitle || ad.brand || 'Featured'}</p>
                                        <p className="sponsored-small-price">Rs. {ad.discounted_price || ad.price || 'Exclusive'}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SponsoredProductBanner;
