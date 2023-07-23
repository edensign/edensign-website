/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useEffect } from 'react';
import { Box } from '@mui/material';

import './imgAnimation.css';

// let dots = document.getElementsByClassName("dot");
// for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
// }
// dots[slideIndex - 1].className += " active";

function Carousel() {
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
            slide.style.display = "none";
        }
        slides[num].style.display = "block";
    };

    function controller(i) {
        slideIndex = slideIndex + i;
        showSlides(slideIndex);
    };

    useEffect(() => {
        showSlides(slideIndex);
    }, []);

    return (
        <Box className="slider">

            <Box className='sliding'>
                <span className='header-span'> PHOTO 1</span>
                <img src="https://edensign.blob.core.windows.net/image-storage/header/photo1.jpg" />
            </Box>
            <Box className='sliding'>
                <span className='header-span'> PHOTO 2</span>
                <img src="https://edensign.blob.core.windows.net/image-storage/header/photo2.jpg" />
            </Box>
            <Box className='sliding'>
                <span className='header-span'> PHOTO 3</span>
                <img src="https://edensign.blob.core.windows.net/image-storage/header/photo3.jpg" />
            </Box>

            <span className='arrow' style={{ left: "4%" }} onClick={() => controller(-1)}>&#10094;</span>
            <span className='arrow' style={{ right: "4%" }} onClick={() => controller(+1)}>&#10095;</span>

        </Box>
    )
}

export default Carousel;
