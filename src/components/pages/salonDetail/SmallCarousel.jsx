/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';


const SmallCarousel = () => {
    const { images } = useSelector(state => state.salonDetail);
    let slideIndex = 0;

    function showSlides(num) {
        let slides = document.getElementsByClassName("small-sliding");
        let bigSlides = document.getElementsByClassName("big-sliding");
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
        for (let bigSlide of bigSlides) {
            bigSlide.style.opacity = "0";
        }
        slides[num].style.opacity = "1";
        bigSlides[num].style.opacity = "1";
        // controller(1);
    };

    function controller(i) {
        slideIndex = slideIndex + i;
        showSlides(slideIndex);
    };

    setTimeout(() => {
        controller(0);
        console.log("Running Controller");
    }, 500);

    // useEffect(() => {
    // let interval = setInterval(() => {
    // }, 2000);

    // return () => {
    //     clearInterval(interval);
    // };
    // }, []);

    return (
        <Box className="small-slider">

            {images?.map((image, index) => (
                <Box className='small-sliding' key={index} >
                    <img src={`https://edensign.blob.core.windows.net/image-storage/salon/${image}`} />
                </Box>
            )
            )}

            <span className='small-arrow' style={{ left: "4%" }} onClick={() => controller(-1)}>&#10094;</span>
            <span className='small-arrow' style={{ right: "4%" }} onClick={() => controller(+1)}>&#10095;</span>

        </Box >
    )
}

export default SmallCarousel;
