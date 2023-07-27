/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useEffect } from 'react';
import { Box } from '@mui/material';

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
        // let interval = setInterval(() => {
        // }, 2000);

        // return () => {
        //     clearInterval(interval);
        // };
    }, []);

    return (
        <Box className="salon-slider">

            <Box className='salon-sliding'>
                <img src="https://edensign.blob.core.windows.net/image-storage/header/photo1.jpg" />
            </Box>
            <Box className='salon-sliding'>
                <img src="https://edensign.blob.core.windows.net/image-storage/header/photo2.jpg" />
            </Box>
            <Box className='salon-sliding'>
                <img src="https://edensign.blob.core.windows.net/image-storage/header/photo3.jpg" />
            </Box>
            <Box className='salon-sliding'>
                <img src={haircutImg} />
            </Box>
            <Box className='salon-sliding'>
                <img src={hairwashImg} />
            </Box>
            <Box className='salon-sliding'>
                <img src={pedicureImg} />
            </Box>
            <Box className='salon-sliding'>
                <img src={manicureImg} />
            </Box>
            <Box className='salon-sliding'>
                <img src={bridalMakeupImg} />
            </Box>

            <span className='salon-arrow' style={{ left: "4%" }} onClick={() => controller(-1)}>&#10094;</span>
            <span className='salon-arrow' style={{ right: "4%" }} onClick={() => controller(+1)}>&#10095;</span>

        </Box>
    )
}

export default SalonCarousel;
