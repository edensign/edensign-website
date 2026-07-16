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

    const S3_BASE = import.meta.env.VITE_S3_BASE_URL || 'https://salon-s3.s3.us-east-1.amazonaws.com';

    // Use "last_full_salon" for detail hero; fall back to front → any
    const fullSalonImages = images?.filter(img => img && img.image_src && img.type === 'last_full_salon');
    const frontImages = images?.filter(img => img && img.image_src && img.type === 'front');
    const displayImages = fullSalonImages?.length > 0
        ? fullSalonImages
        : frontImages?.length > 0
            ? frontImages
            : (images?.filter(img => img && img.image_src)?.length > 0
                ? images?.filter(img => img && img.image_src)
                : [{ type: 'front', image_src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', isFallback: true }]);

    function showSlides(num) {
        let slides = document.getElementsByClassName("small-sliding");
        let bigSlides = document.getElementsByClassName("big-sliding");
        if (num == slides.length) { num = 0; slideIndex = 0; }
        if (num < 0) { num = slides.length - 1; slideIndex = slides.length - 1; }

        for (let slide of slides) slide.style.opacity = "0";
        for (let bigSlide of bigSlides) bigSlide.style.opacity = "0";
        if (slides[num]) slides[num].style.opacity = "1";
        if (bigSlides[num]) bigSlides[num].style.opacity = "1";
    };

    function controller(i) {
        slideIndex = slideIndex + i;
        showSlides(slideIndex);
    };

    setTimeout(() => {
        controller(0);
    }, 500);

    return (
        <Box className="small-slider">

            {displayImages?.map((image, index) => (
                <Box className='small-sliding' key={index} >
                    <img src={image.isFallback || image.image_src?.startsWith('http') ? image.image_src : `${S3_BASE}/eden-sign/salon/${image.type || 'front'}/${image.image_src}`} alt="Salon" />
                </Box>
            ))}

            <span className='small-arrow' style={{ left: "4%" }} onClick={() => controller(-1)}>&#10094;</span>
            <span className='small-arrow' style={{ right: "4%" }} onClick={() => controller(+1)}>&#10095;</span>

        </Box >
    )
}

export default SmallCarousel;
