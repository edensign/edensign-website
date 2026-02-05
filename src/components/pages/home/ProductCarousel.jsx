/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useEffect } from 'react';
import { Box, Chip, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import botanicsImg from "../../assets/products/botanics.jpg"
import cleanserImg from "../../assets/products/cleanser.jpg"
import creamImg from "../../assets/products/cream.jpg"
import foundationImg from "../../assets/products/foundation.jpg"
import lorealImg from "../../assets/products/loreal.jpg"
import lotionImg from "../../assets/products/lotion.jpg"
import moisturiserImg from "../../assets/products/moisturiser.jpg"
import perfumeImg from "../../assets/products/perfume.jpg"

const ProductCarousel = () => {
    let slideIndex = 0;
    let counter = 3;
    const ratings = [4.5, 4.5, 4.5, 4, 4, 4.5, 4, 4.5];

    function showSlides(num) {
        let slides = document.getElementsByClassName("salon-sliding");
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
        <Box className="salon-slider" justifyContent="space-around" alignItems="baseline" width="80%" height="76vh" marginBottom="10%">

            <Box className='salon-sliding' sx={{ height: "99%", width: "32%", borderRadius: "10px", margin: "0 1%" }} boxShadow="2px 2px 4px hsl(0, 0%, 50%)" backgroundColor="#ffffff">
                <Box style={{ position: "absolute", top: "24px", left: "12px" }}>
                    <Chip icon={<StarIcon sx={{ backgroundColor: "#ffc600", color: "#ffffff !important", borderRadius: "50%", padding: "2px" }} />}
                        label="featured" variant="outlined" sx={{ backgroundColor: "#ffffff", color: "hsl(0, 0%, 30%)", fontWeight: "400", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }} />
                </Box>

                <img src={lorealImg} alt="LOreal Paris" style={{ borderRadius: "10px" }} />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.1em", textTransform: "capitalize" }}>
                        Bonjour Nudista
                    </h4>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                        <Rating name="read-only" value={ratings[0]} readOnly />
                        {/* <a href="" rel='noreferrer' target="_blank" style={{ textDecoration: "none" }}>
                            Know More
                        </a> */}
                    </Box>
                </Box>
            </Box>

            <Box className='salon-sliding' sx={{ height: "99%", width: "32%", borderRadius: "10px", margin: "0 1%" }} boxShadow="2px 2px 4px hsl(0, 0%, 50%)" backgroundColor="#ffffff">
                <Box style={{ position: "absolute", top: "24px", left: "12px" }}>
                    <Chip icon={<StarIcon sx={{ backgroundColor: "#ffc600", color: "#ffffff !important", borderRadius: "50%", padding: "2px" }} />}
                        label="featured" variant="outlined" sx={{ backgroundColor: "#ffffff", color: "hsl(0, 0%, 30%)", fontWeight: "400", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }} />
                </Box>
                <img src={perfumeImg} alt="Rance Perfume" style={{ borderRadius: "10px" }} />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.1em", textTransform: "capitalize" }}>
                        Rance 1795 perfume
                    </h4>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                        <Rating name="read-only" value={ratings[1]} readOnly />
                        {/* <a href="" rel='noreferrer' target="_blank" style={{ textDecoration: "none" }}>
                            Know More
                        </a> */}
                    </Box>
                </Box>
            </Box>

            <Box className='salon-sliding' sx={{ height: "99%", width: "32%", borderRadius: "10px", margin: "0 1%" }} boxShadow="2px 2px 4px hsl(0, 0%, 50%)" backgroundColor="#ffffff">
                <Box style={{ position: "absolute", top: "24px", left: "12px" }}>
                    <Chip icon={<StarIcon sx={{ backgroundColor: "#ffc600", color: "#ffffff !important", borderRadius: "50%", padding: "2px" }} />}
                        label="featured" variant="outlined" sx={{ backgroundColor: "#ffffff", color: "hsl(0, 0%, 30%)", fontWeight: "400", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }} />
                </Box>
                <img src={lotionImg} alt="Farmasi" style={{ borderRadius: "10px" }} />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.1em", textTransform: "capitalize" }}>
                        Brown Sugar
                    </h4>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                        <Rating name="read-only" value={ratings[2]} readOnly />
                        {/* <a href="" rel='noreferrer' target="_blank" style={{ textDecoration: "none" }}>
                            Know More
                        </a> */}
                    </Box>
                </Box>
            </Box>

            <Box className='salon-sliding' sx={{ height: "99%", width: "32%", borderRadius: "10px", margin: "0 1%" }} boxShadow="2px 2px 4px hsl(0, 0%, 50%)" backgroundColor="#ffffff">
                <Box style={{ position: "absolute", top: "24px", left: "12px" }}>
                    <Chip icon={<StarIcon sx={{ backgroundColor: "#ffc600", color: "#ffffff !important", borderRadius: "50%", padding: "2px" }} />}
                        label="featured" variant="outlined" sx={{ backgroundColor: "#ffffff", color: "hsl(0, 0%, 30%)", fontWeight: "400", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }} />
                </Box>
                <img src={botanicsImg} alt="Botanics" />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.1em", textTransform: "capitalize" }}>
                        All Bright
                    </h4>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                        <Rating name="read-only" value={ratings[3]} readOnly />
                        {/* <a href="" rel='noreferrer' target="_blank" style={{ textDecoration: "none" }}>
                            Know More
                        </a> */}
                    </Box>
                </Box>
            </Box>

            <Box className='salon-sliding' sx={{ height: "99%", width: "32%", borderRadius: "10px", margin: "0 1%" }} boxShadow="2px 2px 4px hsl(0, 0%, 50%)" backgroundColor="#ffffff">
                <Box style={{ position: "absolute", top: "24px", left: "12px" }}>
                    <Chip icon={<StarIcon sx={{ backgroundColor: "#ffc600", color: "#ffffff !important", borderRadius: "50%", padding: "2px" }} />}
                        label="featured" variant="outlined" sx={{ backgroundColor: "#ffffff", color: "hsl(0, 0%, 30%)", fontWeight: "400", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }} />
                </Box>
                <img src={creamImg} alt="Hydrating Cream" />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.1em", textTransform: "capitalize" }}>
                        Hydrating Cream
                    </h4>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                        <Rating name="read-only" value={ratings[4]} readOnly />
                        {/* <a href="" rel='noreferrer' target="_blank" style={{ textDecoration: "none" }}>
                            Know More
                        </a> */}
                    </Box>
                </Box>
            </Box>

            <Box className='salon-sliding' sx={{ height: "99%", width: "32%", borderRadius: "10px", margin: "0 1%" }} boxShadow="2px 2px 4px hsl(0, 0%, 50%)" backgroundColor="#ffffff">
                <Box style={{ position: "absolute", top: "24px", left: "12px" }}>
                    <Chip icon={<StarIcon sx={{ backgroundColor: "#ffc600", color: "#ffffff !important", borderRadius: "50%", padding: "2px" }} />}
                        label="featured" variant="outlined" sx={{ backgroundColor: "#ffffff", color: "hsl(0, 0%, 30%)", fontWeight: "400", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }} />
                </Box>
                <img src={cleanserImg} alt="Holy Grail" />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.1em", textTransform: "capitalize" }}>
                        Skin Cleanser
                    </h4>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                        <Rating name="read-only" value={ratings[5]} readOnly />
                        {/* <a href="" rel='noreferrer' target="_blank" style={{ textDecoration: "none" }}>
                            Know More
                        </a> */}
                    </Box>
                </Box>
            </Box>

            <Box className='salon-sliding' sx={{ height: "99%", width: "32%", borderRadius: "10px", margin: "0 1%" }} boxShadow="2px 2px 4px hsl(0, 0%, 50%)" backgroundColor="#ffffff">
                <Box style={{ position: "absolute", top: "24px", left: "12px" }}>
                    <Chip icon={<StarIcon sx={{ backgroundColor: "#ffc600", color: "#ffffff !important", borderRadius: "50%", padding: "2px" }} />}
                        label="featured" variant="outlined" sx={{ backgroundColor: "#ffffff", color: "hsl(0, 0%, 30%)", fontWeight: "400", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }} />
                </Box>
                <img src={moisturiserImg} alt="Misolo Cosmetics" />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.1em", textTransform: "capitalize" }}>
                        Misolo Cosmetics
                    </h4>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                        <Rating name="read-only" value={ratings[6]} readOnly />
                        {/* <a href="" rel='noreferrer' target="_blank" style={{ textDecoration: "none" }}>
                            Know More
                        </a> */}
                    </Box>
                </Box>
            </Box>

            <Box className='salon-sliding' sx={{ height: "99%", width: "32%", borderRadius: "10px", margin: "0 1%" }} boxShadow="2px 2px 4px hsl(0, 0%, 50%)" backgroundColor="#ffffff">
                <Box style={{ position: "absolute", top: "24px", left: "12px" }}>
                    <Chip icon={<StarIcon sx={{ backgroundColor: "#ffc600", color: "#ffffff !important", borderRadius: "50%", padding: "2px" }} />}
                        label="featured" variant="outlined" sx={{ backgroundColor: "#ffffff", color: "hsl(0, 0%, 30%)", fontWeight: "400", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }} />
                </Box>
                <img src={foundationImg} alt="Foundation" />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h4 style={{ fontWeight: "400", fontFamily: "Marcellus, sans-serif", fontSize: "26px", letterSpacing: "0.1em", textTransform: "capitalize" }}>
                        Foundation
                    </h4>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                        <Rating name="read-only" value={ratings[7]} readOnly />
                        {/* <a href="" rel='noreferrer' target="_blank" style={{ textDecoration: "none" }}>
                            Know More
                        </a> */}
                    </Box>
                </Box>
            </Box>

            <span className='salon-arrow' style={{ left: "4%" }} onClick={() => prevArrowClick(-1)}>&#10094;</span>
            <span className='salon-arrow' style={{ right: "4%" }} onClick={() => nextArrowClick(+1)}>&#10095;</span>

        </Box>
    )
}

export default ProductCarousel;
