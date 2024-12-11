/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Box, Button, Tooltip } from '@mui/material';
import { TuneOutlined } from '@mui/icons-material';
import { TrendingFlat } from '@mui/icons-material';

import SmallCarousel from './SmallCarousel';

const DetailPageTop = () => {

    const { images } = useSelector(state => state.salonDetail);

    return (
        <Box sx={{
            height: "120vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "1%",
            position: "relative", backgroundPosition: "center", color: "#ffffff"
        }}>
            {images?.map((image, index) => (
                <Box className='big-sliding' key={index} style={{
                    position: "absolute", width: "100%", height: "100%", opacity: "0", transition: "all 1s ease-in", filter: "blur(10px)"
                }}>
                    <img src={`https://edensign1.blob.core.windows.net/image-storage/salon/${image}`} style={{ aspectRatio: "1300/715", width: "100%" }} />
                </Box>
            ))}

            < SmallCarousel />
        </Box>
    )
};

export default DetailPageTop;
