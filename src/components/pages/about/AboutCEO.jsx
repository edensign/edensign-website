/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Button, Box, Grid, useMediaQuery } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';


const AboutCEO = () => {
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    return (
        <Grid container sx={{ marginBottom: "12%", minHeight: "60vh" }}>
            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Box
                    sx={{ height: { xs: "auto", sm: "450px" }, width: { xs: "90%", md: "80%" }, overflow: "hidden" }}>
                    <img src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/makeup/skincare-closeup.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="ceo-makeup-closeup" />
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box
                    sx={{
                        marginTop: { xs: "20px", md: "10%" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: { xs: "100%", md: "80%" },
                        backgroundColor: "#f5f6fa",
                        py: { xs: 4, md: 0 }
                    }}>
                    <p style={{ fontFamily: "Marcellus,sans-serif", fontWeight: "400", fontSize: "20px", lineHeight: "20px", letterSpacing: "0.80em", textTransform: "uppercase", textAlign: "center" }}> Hello From </p>
                    <DiamondIcon sx={{ fontSize: "12px", margin: "1% 0 2% 0" }} />
                    <p style={{ fontWeight: "400", fontSize: "32px", lineHeight: "1.28", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "6px" }}> ceo </p>
                    <p style={{ fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.015em", padding: "0 40px", textAlign: "center" }}> Hello there, this is your ultimate destination for effortless salon appointment bookings! We bridge the gap between clients and salons, making beauty and grooming services accessible with just a few clicks. Whether you're looking for a haircut, spa treatment, or a complete makeover, we've got you covered. </p>
                    <p style={{ fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.015em", padding: "0 40px", textAlign: "center", marginTop: "12px" }}> Our user-friendly platform helps you discover top-rated salons, view their services, check availability, and book your appointment instantly. Designed with convenience in mind, Eden Sign ensures a seamless experience for both clients and salon professionals. </p>
                </Box>
            </Grid>
        </Grid>
    )
}

export default AboutCEO;
