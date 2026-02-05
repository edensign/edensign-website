/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useEffect } from 'react';
import { Box } from '@mui/material';

// import haircutImg from "../../assets/services/haircut.jpg"
// import hairwashImg from "../../assets/services/hair_wash.jpg"
// import pedicureImg from "../../assets/services/pedicure.jpg"
// import manicureImg from "../../assets/services/manicure.jpg"
// import bridalMakeupImg from "../../assets/services/bridal_makeup.jpg"

const Testimonials = () => {
    let slideIndex = 0;
    let counter = 2;

    function showSlides(num) {
        let slides = document.getElementsByClassName("testimonial-sliding");
        if (num == slides.length - (counter - 1)) {
            num = 0;
            slideIndex = 0;
        }
        if (num < 0) {
            num = slides.length - counter;
            slideIndex = slides.length - counter;
        }
        for (let slide of slides) {
            slide.style.display = "none";
            // slide.style.opacity = "1";
        }
        if (counter) {
            for (let x = num; x < (counter + num); x++) {
                slides[x].style.display = "flex";
                // slides[x].style.opacity = "1";
            }
        } else {
            slides[num].style.display = "flex";
            // slides[num].style.opacity = "1";
        }
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

    useEffect(() => {
        showSlides(slideIndex);
    }, []);

    return (
        <Box position="relative" width="100%" height="100vh" marginBottom="8%">
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "89%", margin: "auto" }}>
                <p style={{ fontSize: "72px", fontWeight: "700", fontFamily: "Marcellus, sans-serif", lineHeight: "1.2em", letterSpacing: "-0.04em", width: "50%", margin: "1% 0" }}>Testimonials</p>
                <span style={{ fontSize: "14px", fontWeight: "500", letterSpacing: "2.1px", textTransform: "capitalize", margin: "-16px 0 6px 0" }}>What clients say about us</span>
                <span style={{ border: "1px solid #000000", width: "108px", marginBottom: "4%" }}></span>
            </Box>


            <Box className="testimonial-slider">

                <Box className='testimonial-sliding'>
                    <div className="single-testimonial"></div>
                    <div className="round-1 round"></div>
                    <div className="round-2 round"></div>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize", margin: "30px 0 15px 0" }}>
                        John Doe
                    </h4>
                    <p style={{ width: "78%", fontWeight: "300", fontSize: "13px", lineHeight: "26px", letterSpacing: "0.1em", textAlign: "center" }}> I absolutely love this platform! Booking salon appointments has never been easier. The user-friendly interface and seamless process save me so much time. Plus, the variety of salons and services available is amazing. Highly recommend it to anyone who values convenience and quality!</p>
                    <img src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo1.jpg" />
                </Box>

                <Box className='testimonial-sliding'>
                    <div className="single-testimonial"></div>
                    <div className="round-1 round"></div>
                    <div className="round-2 round"></div>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize", margin: "30px 0 15px 0" }}>
                        Esra Bilgic
                    </h4>
                    <p style={{ width: "78%", fontWeight: "300", fontSize: "13px", lineHeight: "26px", letterSpacing: "0.1em", textAlign: "center" }}> This platform is a game-changer for both customers and salon professionals. I booked my appointment in just a few clicks, and everything went perfectly. The added features like job opportunities and access to professional products make it stand out. Truly an all-in-one solution for the beauty industry!</p>
                    <img src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo2.jpg" />
                </Box>

                <Box className='testimonial-sliding'>
                    <div className="single-testimonial"></div>
                    <div className="round-1 round"></div>
                    <div className="round-2 round"></div>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize", margin: "30px 0 15px 0" }}>
                        Davis Morey
                    </h4>
                    <p style={{ width: "78%", fontWeight: "300", fontSize: "13px", lineHeight: "26px", letterSpacing: "0.1em", textAlign: "center" }}> This platform has completely transformed how I book salon appointments. It's so easy to find top-rated salons, check availability, and book instantly. The experience is smooth, reliable, and stress-free. I couldn’t ask for a better way to manage my beauty needs!</p>
                    <img src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo3.jpg" />

                </Box>

                {/*
                 <Box className='testimonial-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={haircutImg} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Haircut
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={e => e.preventDefault()}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box>

            <Box className='testimonial-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={hairwashImg} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Hair Wash
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={e => e.preventDefault()}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box>

            <Box className='testimonial-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={pedicureImg} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Pedicure
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={e => e.preventDefault()}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box>

            <Box className='testimonial-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={manicureImg} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Manicure
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={e => e.preventDefault()}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box>

            <Box className='testimonial-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src={bridalMakeupImg} />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Bridal Makeup
                    </h4>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-20px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <Button type="submit" onClick={e => e.preventDefault()}
                        sx={{
                            borderRadius: 0,
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            lineHeight: "2em",
                            fontWeight: "600",
                            padding: "4px 0",
                            borderBottom: "1px solid",
                            textTransform: "capitalize"
                        }}>Book Appointment</Button>
                </Box>
            </Box> 
            
            </Box> */}

                <span className='testimonial-arrow' style={{ left: "4%" }} onClick={() => prevArrowClick(-1)}>&#10094;</span>
                <span className='testimonial-arrow' style={{ right: "4%" }} onClick={() => nextArrowClick(+1)}>&#10095;</span>

            </Box>
        </Box>
    )
}

export default Testimonials;
