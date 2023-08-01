/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box, Grid, useMediaQuery } from '@mui/material';

const ImageBoxes = () => {
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    return (        // border: "3px solid crimson",
        <Grid container sx={{ width: "100%", maxHeight: "100vh", margin: "4% 0" }}>
            <Grid item xs={12} md={6}>
                <Box sx={{
                    border: "2px solid green", position: "relative", width: "100%", height: "90vh", backgroundColor: '#ffffff'
                }}
                >
                    <img id="best-of-img" src="https://edensign.blob.core.windows.net/image-storage/makeup/skincare.jpg" />
                    <p id="best-of"> best of </p>
                    <p id="skincare"> skincare </p>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{
                    border: "2px solid green", position: "relative", width: "100%", height: "90vh", backgroundColor: '#ffffff', marginTop: "4%"
                }}
                >
                    <img id="top-brands-img" src="https://edensign.blob.core.windows.net/image-storage/makeup/product.jpg" />
                    <p id="top-brands"> top brands </p>
                    <p id="makeup"> makeup </p>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ImageBoxes;
