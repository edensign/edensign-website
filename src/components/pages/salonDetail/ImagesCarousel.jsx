/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useEffect } from 'react';
import { Box, Button } from '@mui/material';

// import haircutImg from "../../assets/services/haircut.jpg"
// import pedicureImg from "../../assets/"
// import manicureImg from "../../assets/services/manicure.jpg"
// import bridalMakeupImg from "../../assets/services/bridal-makeup.jpg"

const ImagesCarousel = () => {
    let dateVar = new Date();
    let slideIndex = 0;
    let counter = 4;
    const newsSectionURL = "https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/";

    function showSlides(num) {
        let slides = document.getElementsByClassName("images-sliding");
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
                slides[x].style.display = "block";
                // slides[x].style.opacity = "1";
            }
        } else {
            slides[num].style.display = "block";
        }
        // controller(num);
    };

    function controller(i) {
        slideIndex = slideIndex + i;
        showSlides(slideIndex);
    };

    useEffect(() => {
        showSlides(slideIndex);
        // let interval = setInterval(() => {
        // }, 2000);

        // return () => {
        //     clearInterval(interval);
        // };
    }, []);

    return (
        <Box className="images-slider">

            <Box className='images-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "30%", left: "40px", padding: "18px 12px", backdropFilter: "blur(20px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span>{dateVar.toDateString()}</span>
                </Box>
                <img src={`${newsSectionURL}services/bridal-makeup.jpg`} />
                <Box>
                    <p style={{ marginTop: "20px", fontSize: "13px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "uppercase" }}>news & offers</p>
                    <p style={{ marginTop: "-2px", fontWeight: "400", fontSize: "20px", letterSpacing: "0.01em", textTransform: "capitalize" }}>
                        Mind and Body Relaxation
                    </p>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-6px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
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
                        }}>Read More</Button>
                </Box>
            </Box>

            <Box className='images-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "30%", left: "40px", padding: "18px 12px", backdropFilter: "blur(20px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span>{dateVar.toDateString()}</span>
                </Box>
                <img src={`${newsSectionURL}header/photo2.jpg`} />
                <Box>
                    <p style={{ marginTop: "20px", fontSize: "13px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "uppercase" }}>news & offers</p>
                    <p style={{ marginTop: "-2px", fontWeight: "400", fontSize: "20px", letterSpacing: "0.01em", textTransform: "capitalize" }}>
                        Body and soul - reviews for best spa
                    </p>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-6px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
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
                        }}>Read More</Button>
                </Box>
            </Box>

            <Box className='images-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "30%", left: "40px", padding: "18px 12px", backdropFilter: "blur(20px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span>{dateVar.toDateString()}</span>
                </Box>
                <img src={`${newsSectionURL}header/photo3.jpg`} />
                <Box>
                    <p style={{ marginTop: "20px", fontSize: "13px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "uppercase" }}>news & offers</p>
                    <p style={{ marginTop: "-2px", fontWeight: "400", fontSize: "20px", letterSpacing: "0.01em", textTransform: "capitalize" }}>
                        Body and soul - reviews for best spa
                    </p>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-6px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
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
                        }}>Read More</Button>
                </Box>
            </Box>

            <Box className='images-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "30%", left: "40px", padding: "18px 12px", backdropFilter: "blur(20px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span>{dateVar.toDateString()}</span>
                </Box>
                <img src={`${newsSectionURL}services/pedicure.jpg`} />
                <Box>
                    <p style={{ marginTop: "20px", fontSize: "13px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "uppercase" }}>news & offers</p>
                    <p style={{ marginTop: "-2px", fontWeight: "400", fontSize: "20px", letterSpacing: "0.01em", textTransform: "capitalize" }}>
                        Body and soul - reviews for best spa
                    </p>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-6px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
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
                        }}>Read More</Button>
                </Box>
            </Box>

            <Box className='images-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "30%", left: "40px", padding: "18px 12px", backdropFilter: "blur(20px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span>{dateVar.toDateString()}</span>
                </Box>
                <img src={`${newsSectionURL}services/airbrush-makeup.jpg`} />
                <Box>
                    <p style={{ marginTop: "20px", fontSize: "13px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "uppercase" }}>news & offers</p>
                    <p style={{ marginTop: "-2px", fontWeight: "400", fontSize: "20px", letterSpacing: "0.01em", textTransform: "capitalize" }}>
                        Body and soul - reviews for best spa
                    </p>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-6px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
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
                        }}>Read More</Button>
                </Box>
            </Box>

            {/* <Box className='images-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "30%", left: "40px", padding: "18px 12px", backdropFilter: "blur(20px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span>{dateVar.toDateString()}</span>
                </Box>
                <img src={pedicureImg} />
                <Box>
                    <p style={{ marginTop: "20px", fontSize: "13px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "uppercase" }}>news & offers</p>
                    <p style={{ marginTop: "-2px", fontWeight: "400", fontSize: "20px", letterSpacing: "0.01em", textTransform: "capitalize" }}>
                        Body and soul - reviews for best spa
                    </p>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-6px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
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
                        }}>Read More</Button>
                </Box>
            </Box>

            <Box className='images-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "30%", left: "40px", padding: "18px 12px", backdropFilter: "blur(20px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span>{dateVar.toDateString()}</span>
                </Box>
                <img src={manicureImg} />
                <Box>
                    <p style={{ marginTop: "20px", fontSize: "13px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "uppercase" }}>news & offers</p>
                    <p style={{ marginTop: "-2px", fontWeight: "400", fontSize: "20px", letterSpacing: "0.01em", textTransform: "capitalize" }}>
                        Body and soul - reviews for best spa
                    </p>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-6px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
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
                        }}>Read More</Button>
                </Box>
            </Box>

            <Box className='images-sliding'>
                <Box style={{ display: "flex", alignItems: "center", position: "absolute", top: "30%", left: "40px", padding: "18px 12px", backdropFilter: "blur(20px)", color: "#ffffff", fontWeight: "500", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    <span>{dateVar.toDateString()}</span>
                </Box>
                <img src={bridalMakeupImg} />
                <Box>
                    <p style={{ marginTop: "20px", fontSize: "13px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "uppercase" }}>news & offers</p>
                    <p style={{ marginTop: "-2px", fontWeight: "400", fontSize: "20px", letterSpacing: "0.01em", textTransform: "capitalize" }}>
                        Body and soul - reviews for best spa
                    </p>
                    <p style={{ fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.1em", marginTop: "-6px", paddingRight: "20px" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
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
                        }}>Read More</Button>
                </Box>
            </Box> */}

            <span className='images-arrow' style={{ left: "4%" }} onClick={() => controller(-1)}>&#10094;</span>
            <span className='images-arrow' style={{ right: "4%" }} onClick={() => controller(+1)}>&#10095;</span>

        </Box >
    )
}

export default ImagesCarousel;
