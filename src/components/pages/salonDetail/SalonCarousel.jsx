/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useEffect } from 'react';
import { Box, Button } from '@mui/material';

import haircutImg from "../../assets/services/haircut.jpg"
import hairwashImg from "../../assets/services/hair_wash.jpg"
import pedicureImg from "../../assets/services/pedicure.jpg"
import manicureImg from "../../assets/services/manicure.jpg"
import bridalMakeupImg from "../../assets/services/bridal_makeup.jpg"

const SalonCarousel = () => {
    let slideIndex = 0;
    let counter = 3;

    function showSlides(num) {
        let slides = document.getElementsByClassName("salon-sliding");
        if (num == slides.length - 1) {
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
        if (counter) {
            for (let x = num; x < (counter + num); x++) {
                slides[x].style.display = "block";
                // slides[x].style.opacity = "1";
            }
        } else {
            slides[num].style.display = "block";
            // slides[num].style.opacity = "1";
        }
    };

    function controller(i) {
        slideIndex = slideIndex + i;
        showSlides(slideIndex);
    };

    useEffect(() => {
        showSlides(slideIndex);
    }, []);

    return (
        <Box className="salon-slider">

            <Box className='salon-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src="https://edensign.blob.core.windows.net/image-storage/header/photo1.jpg" />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Airbrush Makeup
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

            <Box className='salon-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src="https://edensign.blob.core.windows.net/image-storage/header/photo2.jpg" />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Matte Makeup
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

            <Box className='salon-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "26px", left: "26px", padding: "18px 12px", backdropFilter: "blur(13px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span style={{ marginRight: "8px" }}>from</span>
                    <span> &#8377;500</span>
                </Box>
                <img src="https://edensign.blob.core.windows.net/image-storage/header/photo3.jpg" />
                <Box>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.2em", textTransform: "capitalize" }}>
                        Mineral Makeup
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

            <Box className='salon-sliding'>
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

            <Box className='salon-sliding'>
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

            <Box className='salon-sliding'>
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

            <Box className='salon-sliding'>
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

            <Box className='salon-sliding'>
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

            <span className='salon-arrow' style={{ left: "4%" }} onClick={() => controller(-1)}>&#10094;</span>
            <span className='salon-arrow' style={{ right: "4%" }} onClick={() => controller(+1)}>&#10095;</span>

        </Box >
    )
}

export default SalonCarousel;
