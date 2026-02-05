/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box, Button, Grid, useMediaQuery } from '@mui/material';

const ImageBoxes = () => {
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    return (        // border: "3px solid crimson",
        <Grid container sx={{ width: "100%", maxHeight: "100vh", marginBottom: "8%" }}>
            <Grid item xs={12} md={6}>
                <Box
                    sx={{
                        position: "relative", width: "100%", height: "90vh", backgroundColor: '#ffffff'
                    }}>
                    <img id="best-of-img" src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/makeup/skincare.jpg" />
                    <p id="best-of"> best of </p>
                    <a href='/salons'>
                        <p id="skincare"> salons </p>
                    </a>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{
                    position: "relative", width: "100%", height: "90vh", backgroundColor: '#ffffff', marginTop: "4%"
                }}>
                    <img id="top-brands-img" src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/makeup/product.jpg" />
                    <p id="top-brands"> book your appointment </p>
                    <p id="makeup"> with us </p>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ImageBoxes;
