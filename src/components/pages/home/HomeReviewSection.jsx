/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React, { useState } from "react";
import { Box, Button, TextField, Rating, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import StarIcon from '@mui/icons-material/Star';
import API from '../../../apis';
import { useToast } from "../../common/Toast";

const HomeReviewSection = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
    const navigate = useNavigate();
    const { showToast } = useToast();

    // Rating states for website experience
    const [easeOfUse, setEaseOfUse] = useState(0);
    const [designAesthetics, setDesignAesthetics] = useState(0);
    const [speedPerformance, setSpeedPerformance] = useState(0);
    const [bookingProcess, setBookingProcess] = useState(0);
    const [overallExperience, setOverallExperience] = useState(0);

    // Form field states
    const [reason, setReason] = useState("");
    const [comments, setComments] = useState("");

    // UI states
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = API.CustomerAPI.getToken();
        if (!token) {
            showToast("Please log in to submit a review.", "warning", "Login", () => navigate("/login"));
            return;
        }

        const customer = API.CustomerAPI.getCustomer();

        // Validate at least one rating is provided
        if (easeOfUse === 0 && designAesthetics === 0 && speedPerformance === 0 && bookingProcess === 0 && overallExperience === 0) {
            showToast("Please provide at least one rating.", "warning");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                customer_id: customer?.id || null,
                ease_of_use: easeOfUse,
                design_aesthetics: designAesthetics,
                speed_performance: speedPerformance,
                booking_process: bookingProcess,
                overall_experience: overallExperience,
                reason: reason || null,
                comments: comments || null
            };

            const response = await API.ReviewAPI.submitWebsiteReview(payload);

            if (response.status === "Success") {
                showToast("Thank you for your feedback! Review submitted successfully.", "success");
                // Reset form
                setEaseOfUse(0);
                setDesignAesthetics(0);
                setSpeedPerformance(0);
                setBookingProcess(0);
                setOverallExperience(0);
                setReason("");
                setComments("");
            } else {
                showToast(response.msg || "Failed to submit review. Please try again.", "error");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            showToast("An error occurred. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    const ratingCategories = [
        // { label: "Ease of Use", value: easeOfUse, setter: setEaseOfUse },
        // { label: "Design & Aesthetics", value: designAesthetics, setter: setDesignAesthetics },
        // { label: "Speed & Performance", value: speedPerformance, setter: setSpeedPerformance },
        { label: "Booking Process", value: bookingProcess, setter: setBookingProcess },
        { label: "Overall Experience", value: overallExperience, setter: setOverallExperience },
    ];

    return (
        <section ref={ref} className="es-review-submission-section" style={{ background: '#faf6f1', padding: '90px 8%' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '64px', alignItems: 'center' }} className="es-detail-layout">
                {/* Left side: Information/CTA */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                >
                    <span className="es-eyebrow">Rate Your Experience</span>
                    <h2 className="es-section-title">Share Your <em>Feedback</em></h2>
                    <div className="es-title-divider" style={{ marginBottom: '28px' }} />
                    <p className="es-split-body" style={{ marginBottom: '20px' }}>
                        Your feedback helps us maintain the highest service standards. Let us and others know how your website booking experience went by rating the ease of use, design, speed, and overall booking process.
                    </p>
                    <p className="es-split-body" style={{ fontStyle: 'italic', color: '#c7956c', fontWeight: 500 }}>
                        “Customer feedback is the compass that guides our dedication to luxury beauty experiences.”
                    </p>
                </motion.div>

                {/* Right side: Submission form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                >
                    <Box sx={{
                        background: '#ffffff',
                        border: '1.5px solid rgba(199, 149, 108, 0.25)',
                        borderRadius: '24px',
                        padding: { xs: '32px 24px', md: '40px' },
                        boxShadow: '0 12px 40px rgba(26, 10, 0, 0.05)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', borderBottom: '1px solid rgba(199, 149, 108, 0.15)', paddingBottom: '16px' }}>
                            <RateReviewOutlinedIcon sx={{ color: '#c7956c', fontSize: '28px' }} />
                            <Typography sx={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 600, color: '#1a0a00' }}>
                                Write a Website Review
                            </Typography>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Ratings List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '8px 0' }}>
                                {ratingCategories.map((cat, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                        <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: '#5a4038' }}>
                                            {cat.label}
                                        </Typography>
                                        <Rating
                                            name={`rating-${idx}`}
                                            value={cat.value}
                                            onChange={(event, newValue) => cat.setter(newValue)}
                                            emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
                                            sx={{
                                                color: '#c7956c',
                                                '& .MuiRating-iconFilled': { color: '#c7956c' },
                                                '& .MuiRating-iconHover': { color: '#a8724d' },
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Text inputs */}
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Main Reason for Rating"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                sx={{ '& .MuiFilledInput-underline:after': { borderColor: '#c7956c' } }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Additional Comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                multiline
                                rows={3}
                                sx={{ '& .MuiFilledInput-underline:after': { borderColor: '#c7956c' } }}
                            />

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={loading}
                                sx={{
                                    background: 'linear-gradient(135deg, #1a0a00, #3d1e0a)',
                                    color: '#fff',
                                    padding: '12px 32px',
                                    borderRadius: '10px',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 6px 20px rgba(26,10,0,0.15)',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #c7956c, #a8724d)',
                                        boxShadow: '0 8px 24px rgba(199,149,108,0.3)',
                                    },
                                    '&.Mui-disabled': {
                                        background: 'rgba(26, 10, 0, 0.12)',
                                        color: 'rgba(26, 10, 0, 0.26)'
                                    }
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Review"}
                            </Button>
                        </form>
                    </Box>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeReviewSection;
