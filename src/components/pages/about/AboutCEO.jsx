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
        <Grid container sx={{ marginBottom: "12%", minHeight: "80vh" }}>
            <Grid item xs={6} md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Box
                    sx={{ height: "100%", width: isMobile ? "100%" : "80%" }}>
                    <img src="https://sinequanonsalons.com/wp-content/uploads/2022/11/sqn_westtown.jpg" className='collection-img' alt="new-collection" />
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
                        backgroundColor: "#f5f6fa;",
                    }}>
                    <p style={{ fontFamily: "Marcellus,sans-serif", fontWeight: "400", fontSize: "20px", lineHeight: "20px", letterSpacing: "0.8em", textTransform: "uppercase" }}> Hello From </p>
                    <DiamondIcon sx={{ fontSize: "12px", margin: "1% 0 2% 0" }} />
                    <p style={{ fontWeight: "400", fontSize: "32px", lineHeight: "1.28", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "6px" }}> ceo </p>
                    <p style={{ fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.015em", padding: "0 40px" }}> Hello there, this is the brand new product of the company that will make you go like a lavender queen. Hope you enjoy the day and keep purchasing the latest trends from our company to become fashion icon. </p>
                    <p style={{ fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.015em", padding: "0 40px" }}> Hello there, this is the brand new product of the company that will make you go like a lavender queen. Hope you enjoy the day and keep purchasing the latest trends from our company to become fashion icon. </p>
                    <Button variant='contained' color='primary' sx={{ borderRadius: "0", fontWeight: "400", fontSize: "12px", lineHeight: "1.2", letterSpacing: "0.265em", height: "40px" }}> Read More </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default AboutCEO;
