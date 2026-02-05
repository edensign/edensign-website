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
        console.log('slide', slideIndex)
        showSlides(slideIndex);
    };

    useEffect(() => {
        showSlides(slideIndex);
        let interval = setInterval(() => {
            controller(+1);
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Box className="slider">

            <Box className='sliding'>
                <span className='header-span1'> appointments</span>
                <span className='header-span2'> book with us</span>
                <span className='header-span3'> Whether you're a client looking for exceptional service or a professional seeking exciting opportunities, we’ve got you covered.</span>
                <img src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo1.jpg" />
            </Box>
            <Box className='sliding'>
                <span className='header-span1'> jobs</span>
                <span className='header-span2'> apply with us</span>
                <span className='header-span3'> Platform for salon employees to apply for jobs and connect with their dream salons.</span>
                <img src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo2.jpg" />
            </Box>
            <Box className='sliding'>
                <span className='header-span1'> products</span>
                <span className='header-span2'> buy from us</span>
                <span className='header-span3'>  We offer a curated selection of professional products for salons, ensuring they have access to the best tools and supplies to deliver exceptional services.</span>
                <img src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/header/photo3.jpg" />
            </Box>

            <span className='arrow' style={{ left: "4%" }} onClick={() => controller(-1)}>&#10094;</span>
            <span className='arrow' style={{ right: "4%" }} onClick={() => controller(+1)}>&#10095;</span>

        </Box>
    )
}

export default Carousel;
