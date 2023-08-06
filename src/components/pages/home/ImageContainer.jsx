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
                    <img src="https://edensign.blob.core.windows.net/image-storage/makeup/skincare-closeup.jpg" className='collection-img' alt="new-collection" />
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
                    <p style={{ fontFamily: "Marcellus,sans-serif", fontWeight: "400", fontSize: "20px", lineHeight: "20px", letterSpacing: "0.8em", textTransform: "uppercase" }}> new collection </p>
                    <DiamondIcon sx={{ fontSize: "10px" }} />
                    <p style={{ fontWeight: "400", fontSize: "32px", lineHeight: "1.28", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "6px" }}> lavender queen </p>
                    <p style={{ fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.015em", padding: "0 40px" }}> Hello there, this is the brand new product of the company that will make you go like a lavender queen. Hope you enjoy the day and keep purchasing the latest trends from our company to become fashion icon. </p>
                    <p style={{ fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.015em", padding: "0 40px" }}> Hello there, this is the brand new product of the company that will make you go like a lavender queen. Hope you enjoy the day and keep purchasing the latest trends from our company to become fashion icon. </p>
                    <Button variant='contained' color='primary' sx={{ borderRadius: "0", fontWeight: "400", fontSize: "12px", lineHeight: "1.2", letterSpacing: "0.265em", height: "40px" }}> Read More </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ImageContainer;
