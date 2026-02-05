/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Button, Box, Grid, useMediaQuery } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';


const ImageContainer = () => {
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    return (        //border: "3px solid crimson",
        <Grid container sx={{ marginBottom: "12%", minHeight: "80vh" }}>
            <Grid item xs={6} md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Box
                    sx={{ height: "100%", width: isMobile ? "100%" : "80%" }}>
                    <img src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/makeup/skincare-closeup.jpg" className='collection-img' alt="new-collection" />
                </Box>
            </Grid>
            <Grid item xs={6} md={6}>
                <Box
                    sx={{
                        marginTop: "10%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: isMobile ? "100%" : "80%",
                        backgroundColor: "#ffffff"
                    }}>
                    <p style={{ fontFamily: "Marcellus,sans-serif", fontWeight: "400", fontSize: "20px", lineHeight: "20px", letterSpacing: "0.8em", textTransform: "uppercase" }}> Find Your </p>
                    <DiamondIcon sx={{ fontSize: "10px" }} />
                    <p style={{ fontWeight: "400", fontSize: "32px", lineHeight: "1.28", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "6px" }}> Dream Job </p>
                    <p style={{ fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.015em", padding: "0 40px" }}> Not only can you discover top-rated salons, explore services, and book appointments instantly, but we also provide an online platform for salon employees to apply for jobs and connect with their dream salons. Whether you're a client looking for exceptional service or a professional seeking exciting opportunities, we’ve got you covered. </p>
                    <p style={{ fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.015em", padding: "0 40px" }}> Join us in transforming the beauty and grooming industry—where style meets convenience, and careers meet dreams! </p>
                    <Button href="/job-seeker" variant='contained' color='primary' sx={{ borderRadius: "0", fontWeight: "400", fontSize: "12px", lineHeight: "1.2", letterSpacing: "0.265em", height: "40px" }}> Read More </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ImageContainer;
