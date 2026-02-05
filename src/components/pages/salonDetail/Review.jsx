/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React from "react";
import { useFormik } from "formik";

import { Box, Button, TextField } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ExtensionIcon from '@mui/icons-material/Extension';
import GroupIcon from '@mui/icons-material/Group';
import TuneIcon from '@mui/icons-material/Tune';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import StarRating from "../../common/StarRating";

const Review = () => {

    const refId = React.useRef();

    const initialValues = {
        check_in: "",
        check_out: "",
        reason: "",
        comments: ""
    };

    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: salonValidation,
        enableReinitialize: true,
        onSubmit: () => watchForm()
    });

    React.useImperativeHandle(refId, () => ({
        Submit: async () => {
            await formik.submitForm();
        }
    }));

    const watchForm = () => {
        if (onChange) {
            onChange({
                values: formik.values,
                validated: formik.isSubmitting
                    ? Object.keys(formik.errors).length === 0
                    : false,
            });
        };
    }
    console.log(formik.values)

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
            // slide.style.opacity = "1";
        }
        slides[num].style.display = "flex";
        // slides[num].style.opacity = "1";
    };

    function prevArrowClick(i) {
        slideIndex = slideIndex + i;
        console.log("Prev click ", i)
        showSlides(slideIndex);
    };

    function nextArrowClick(i) {
        slideIndex = slideIndex + i;
        console.log("Next click ", i);
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

                <form ref={refId}>
                    <div style={{ padding: "1.5rem" }}>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            <div style={{ width: "60%", display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
                                <SentimentSatisfiedAltIcon sx={{ marginRight: "10px", fontSize: "26px" }} />
                                <div style={{ width: "78%", height: "75px", display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: "14px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "capitalize" }}>quality of service</span>
                                    <StarRating />
                                </div>
                            </div>
                            <div style={{ width: "40%", display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
                                <ExtensionIcon sx={{ marginRight: "10px", fontSize: "26px" }} />
                                <div style={{ width: "75%", height: "75px", display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: "14px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "capitalize" }}>facilities</span>
                                    <StarRating sx={{ width: "115px" }} />
                                </div>
                            </div>
                            <div style={{ width: "60%", display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
                                <GroupIcon sx={{ marginRight: "10px", fontSize: "26px" }} />
                                <div style={{ width: "77%", height: "75px", display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: "14px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "capitalize" }}>staff</span>
                                    <StarRating />
                                </div>
                            </div>
                            <div style={{ width: "40%", display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
                                <TuneIcon sx={{ marginRight: "10px", fontSize: "26px" }} />
                                <div style={{ width: "75%", height: "75px", display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: "14px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "capitalize" }}>flexibility</span>
                                    <StarRating />
                                </div>
                            </div>
                            <div style={{ width: "60%", display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
                                <AttachMoneyIcon sx={{ marginRight: "10px", fontSize: "26px" }} />
                                <div style={{ width: "77%", height: "75px", display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: "14px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "capitalize" }}>value of money</span>
                                    <StarRating />
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
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.reason}
                                error={!!formik.touched.reason && !!formik.errors.reason}
                                helperText={formik.touched.reason && formik.errors.reason}
                                sx={{ marginBottom: "3%" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                name="comments"
                                label="Your Comments"
                                autoComplete="new-comments"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.comments}
                                error={!!formik.touched.comments && !!formik.errors.comments}
                                helperText={formik.touched.comments && formik.errors.comments}
                                InputProps={{
                                    style: {
                                        height: "250px"
                                    }
                                }}
                            />
                        </div>

                        <div style={{ display: "flex" }}>
                            <Button type="submit" color='success' variant='contained' onClick={e => e.preventDefault()}
                                sx={{
                                    width: "100px", fontSize: "14px", letterSpacing: "0.15em", lineHeight: "2em", fontWeight: "400", padding: "6px 10px", textTransform: "capitalize"
                                }}> submit </Button>
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
                        <img src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo1.jpg" />
                    </Box>

                    <Box className='review-testimonial-sliding'>
                        <div className="review-single-testimonial"></div>
                        <div className="review-round-1 review-round"></div>
                        <div className="review-round-2 review-round"></div>
                        <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                            Esra Bilgic
                        </h4>
                        <p style={{ width: "78%", fontWeight: "300", fontSize: "13px", lineHeight: "26px", letterSpacing: "0.1em", textAlign: "center" }}> This platform is a game-changer for both customers and salon professionals. I booked my appointment in just a few clicks, and everything went perfectly. The added features like job opportunities and access to professional products make it stand out.</p>
                        <img src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo2.jpg" />
                    </Box>

                    <Box className='review-testimonial-sliding'>
                        <div className="review-single-testimonial"></div>
                        <div className="review-round-1 review-round"></div>
                        <div className="review-round-2 review-round"></div>
                        <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                            Tom Cruize
                        </h4>
                        <p style={{ width: "78%", fontWeight: "300", fontSize: "13px", lineHeight: "26px", letterSpacing: "0.1em", textAlign: "center" }}> This platform has completely transformed how I book salon appointments. It's so easy to find top-rated salons, check availability, and book instantly. The experience is smooth, reliable, and stress-free. I couldn’t ask for a better way to manage my beauty needs!</p>
                        <img src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo3.jpg" />

                    </Box>

                    <span className='review-testimonial-arrow' style={{ left: "4%" }} onClick={() => prevArrowClick(-1)}>&#10094;</span>
                    <span className='review-testimonial-arrow' style={{ right: "4%", zIndex: "11" }} onClick={() => nextArrowClick(+1)}>&#10095;</span>

                </Box>
            </div>
        </Box>
    )
};

export default Review;
