/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Box, Button, TextField, Snackbar, Alert, CircularProgress } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ExtensionIcon from '@mui/icons-material/Extension';
import GroupIcon from '@mui/icons-material/Group';
import TuneIcon from '@mui/icons-material/Tune';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import StarRating from "../../common/StarRating";
import API from '../../../apis';

const Review = () => {
    // Rating states
    const [qualityOfService, setQualityOfService] = useState(0);
    const [facilities, setFacilities] = useState(0);
    const [staff, setStaff] = useState(0);
    const [flexibility, setFlexibility] = useState(0);
    const [valueOfMoney, setValueOfMoney] = useState(0);

    // Form field states
    const [reason, setReason] = useState("");
    const [comments, setComments] = useState("");

    // UI states
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    // Get salon details from Redux store
    const salonDetail = useSelector(state => state.salonDetail);
    const salonId = salonDetail?.salon?.id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate at least one rating is provided
        if (qualityOfService === 0 && facilities === 0 && staff === 0 && flexibility === 0 && valueOfMoney === 0) {
            setSnackbar({ open: true, message: "Please provide at least one rating", severity: "warning" });
            return;
        }

        if (!salonId) {
            setSnackbar({ open: true, message: "Unable to identify salon. Please try again.", severity: "error" });
            return;
        }

        setLoading(true);

        try {
            const payload = {
                salon_id: salonId,
                quality_of_service: qualityOfService,
                facilities: facilities,
                staff: staff,
                flexibility: flexibility,
                value_of_money: valueOfMoney,
                reason: reason || null,
                comments: comments || null
            };

            const response = await API.ReviewAPI.submitReview(payload);

            if (response.status === "Success") {
                setSnackbar({ open: true, message: "Thank you for your review!", severity: "success" });
                // Reset form
                setQualityOfService(0);
                setFacilities(0);
                setStaff(0);
                setFlexibility(0);
                setValueOfMoney(0);
                setReason("");
                setComments("");
            } else {
                setSnackbar({ open: true, message: response.msg || "Failed to submit review", severity: "error" });
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setSnackbar({ open: true, message: "An error occurred. Please try again.", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    let slideIndex = 0;

    function showSlides(num) {
        let slides = document.getElementsByClassName("review-testimonial-sliding");
        if (num == slides.length) {
            num = 0;
            slideIndex = 0;
        }
        if (num < 0) {
            num = slides.length - 1;
            slideIndex = slides.length - 1;
        }
        for (let slide of slides) {
            slide.style.display = "none";
        }
        slides[num].style.display = "flex";
    };

    function prevArrowClick(i) {
        slideIndex = slideIndex + i;
        showSlides(slideIndex);
    };

    function nextArrowClick(i) {
        slideIndex = slideIndex + i;
        showSlides(slideIndex);
    };

    React.useEffect(() => {
        showSlides(slideIndex);
    }, []);


    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "91%", margin: "auto", marginBottom: "8%", position: "relative" }}>
            <div style={{ width: "33%", backgroundColor: "#ffffff", boxShadow: "4px 4px 6px #800080, -4px -4px 6px #800080", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ borderBottom: "1px solid #000000", padding: "1rem 1.5rem", display: "flex", alignItems: "center", width: "100%" }}>
                    <CreateIcon sx={{ marginRight: "10px", fontSize: "30px" }} />
                    <p style={{ fontWeight: "400", fontSize: "22px", fontFamily: "Marcellus, sans-serif", lineHeight: "0.05em", letterSpacing: "-0.04em", textTransform: "capitalize" }}> write a review </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ padding: "1.5rem" }}>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            <div style={{ width: "60%", display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
                                <SentimentSatisfiedAltIcon sx={{ marginRight: "10px", fontSize: "26px" }} />
                                <div style={{ width: "78%", height: "75px", display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: "14px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "capitalize" }}>quality of service</span>
                                    <StarRating
                                        name="quality-of-service"
                                        value={qualityOfService}
                                        onChange={setQualityOfService}
                                    />
                                </div>
                            </div>
                            <div style={{ width: "40%", display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
                                <ExtensionIcon sx={{ marginRight: "10px", fontSize: "26px" }} />
                                <div style={{ width: "75%", height: "75px", display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: "14px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "capitalize" }}>facilities</span>
                                    <StarRating
                                        name="facilities"
                                        value={facilities}
                                        onChange={setFacilities}
                                    />
                                </div>
                            </div>
                            <div style={{ width: "60%", display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
                                <GroupIcon sx={{ marginRight: "10px", fontSize: "26px" }} />
                                <div style={{ width: "77%", height: "75px", display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: "14px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "capitalize" }}>staff</span>
                                    <StarRating
                                        name="staff"
                                        value={staff}
                                        onChange={setStaff}
                                    />
                                </div>
                            </div>
                            <div style={{ width: "40%", display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
                                <TuneIcon sx={{ marginRight: "10px", fontSize: "26px" }} />
                                <div style={{ width: "75%", height: "75px", display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: "14px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "capitalize" }}>flexibility</span>
                                    <StarRating
                                        name="flexibility"
                                        value={flexibility}
                                        onChange={setFlexibility}
                                    />
                                </div>
                            </div>
                            <div style={{ width: "60%", display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
                                <AttachMoneyIcon sx={{ marginRight: "10px", fontSize: "26px" }} />
                                <div style={{ width: "77%", height: "75px", display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: "14px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "capitalize" }}>value of money</span>
                                    <StarRating
                                        name="value-of-money"
                                        value={valueOfMoney}
                                        onChange={setValueOfMoney}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                name="reason"
                                label="Main Reason For Your Rating"
                                autoComplete="new-reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                sx={{ marginBottom: "3%" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                name="comments"
                                label="Your Comments"
                                autoComplete="new-comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                multiline
                                rows={4}
                                InputProps={{
                                    style: {
                                        minHeight: "150px"
                                    }
                                }}
                            />
                        </div>

                        <div style={{ display: "flex" }}>
                            <Button
                                type="submit"
                                color='success'
                                variant='contained'
                                disabled={loading}
                                sx={{
                                    width: "120px", fontSize: "14px", letterSpacing: "0.15em", lineHeight: "2em", fontWeight: "400", padding: "6px 10px", textTransform: "capitalize"
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            {/* testimonials start */}
            <div style={{ width: "65%", background: "linear-gradient(to right, #d3cce3, #e9e4f0)", boxShadow: "4px 4px 6px #800080, -4px -4px 6px #800080" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p style={{ fontSize: "62px", fontWeight: "700", fontFamily: "Marcellus, sans-serif", lineHeight: "1.2em", letterSpacing: "-0.04em", marginBottom: "-2px" }}>Testimonials</p>
                    <span style={{ fontSize: "14px", fontWeight: "500", letterSpacing: "2.1px", textTransform: "capitalize", margin: "0 0 6px 0" }}>What clients say about us</span>
                    <span style={{ border: "1px solid #000000", width: "108px", marginBottom: "6%" }}></span>
                </Box>

                <Box className="review-testimonial-slider">

                    <Box className='review-testimonial-sliding'>
                        <div className="review-single-testimonial"></div>
                        <div className="review-round-1 review-round"></div>
                        <div className="review-round-2 review-round"></div>
                        <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                            John Doe
                        </h4>
                        <p style={{ width: "78%", fontWeight: "300", fontSize: "13px", lineHeight: "26px", letterSpacing: "0.1em", textAlign: "center" }}> I absolutely love this platform! Booking salon appointments has never been easier. The user-friendly interface and seamless process save me so much time. Plus, the variety of salons and services available is amazing. Highly recommend it to anyone who values convenience and quality!</p>
                        <img 
                            src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo1.jpg" 
                            loading="lazy"
                            decoding="async"
                        />
                    </Box>

                    <Box className='review-testimonial-sliding'>
                        <div className="review-single-testimonial"></div>
                        <div className="review-round-1 review-round"></div>
                        <div className="review-round-2 review-round"></div>
                        <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                            Esra Bilgic
                        </h4>
                        <p style={{ width: "78%", fontWeight: "300", fontSize: "13px", lineHeight: "26px", letterSpacing: "0.1em", textAlign: "center" }}> This platform is a game-changer for both customers and salon professionals. I booked my appointment in just a few clicks, and everything went perfectly. The added features like job opportunities and access to professional products make it stand out.</p>
                        <img 
                            src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo2.jpg" 
                            loading="lazy"
                            decoding="async"
                        />
                    </Box>

                    <Box className='review-testimonial-sliding'>
                        <div className="review-single-testimonial"></div>
                        <div className="review-round-1 review-round"></div>
                        <div className="review-round-2 review-round"></div>
                        <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                            Tom Cruize
                        </h4>
                        <p style={{ width: "78%", fontWeight: "300", fontSize: "13px", lineHeight: "26px", letterSpacing: "0.1em", textAlign: "center" }}> This platform has completely transformed how I book salon appointments. It's so easy to find top-rated salons, check availability, and book instantly. The experience is smooth, reliable, and stress-free. I couldn't ask for a better way to manage my beauty needs!</p>
                        <img 
                            src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo3.jpg" 
                            loading="lazy"
                            decoding="async"
                        />

                    </Box>

                    <span className='review-testimonial-arrow' style={{ left: "4%" }} onClick={() => prevArrowClick(-1)}>&#10094;</span>
                    <span className='review-testimonial-arrow' style={{ right: "4%", zIndex: "11" }} onClick={() => nextArrowClick(+1)}>&#10095;</span>

                </Box>
            </div>

            {/* Snackbar for feedback */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
};

export default Review;

