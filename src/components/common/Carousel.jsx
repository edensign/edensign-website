/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useEffect } from 'react';
import { Box } from '@mui/material';

import "./index.css";

// let dots = document.getElementsByClassName("dot");
// for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
// }
// dots[slideIndex - 1].className += " active";

const Carousel = () => {
    let slideIndex = 0;

    function showSlides(num) {
        let slides = document.getElementsByClassName("sliding");
        if (num == slides.length) {
            num = 0;
            slideIndex = 0;
        }
        if (num < 0) {
            num = slides.length - 1;
            slideIndex = slides.length - 1;
        }
        for (let slide of slides) {
            slide.style.opacity = "0";
        }
        slides[num].style.opacity = "1";
        // controller(1);
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
        <Box className="slider">

            <Box className='sliding'>
                <span className='header-span1'> collection</span>
                <span className='header-span2'> forever beautiful</span>
                <span className='header-span3'> This collection focuses on natural, plant-based ingredients to help customers achieve a radiant and healthy glow.</span>
                <img src="https://edensign1.blob.core.windows.net/image-storage/header/photo1.jpg" />
            </Box>
            <Box className='sliding'>
                <span className='header-span1'> new collection</span>
                <span className='header-span2'> jozy and marco</span>
                <span className='header-span3'> This collection is all about making a statement with vibrant colors and bold finishes.</span>
                <img src="https://edensign1.blob.core.windows.net/image-storage/header/photo2.jpg" />
            </Box>
            <Box className='sliding'>
                <span className='header-span1'> article</span>
                <span className='header-span2'> princess story</span>
                <span className='header-span3'> This story is perfect for customers who prefer a minimalist approach to makeup.</span>
                <img src="https://edensign1.blob.core.windows.net/image-storage/header/photo3.jpg" />
            </Box>

            <span className='arrow' style={{ left: "4%" }} onClick={() => controller(-1)}>&#10094;</span>
            <span className='arrow' style={{ right: "4%" }} onClick={() => controller(+1)}>&#10095;</span>

        </Box>
    )
}

export default Carousel;
