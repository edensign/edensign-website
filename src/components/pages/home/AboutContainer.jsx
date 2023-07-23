/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Button, Box, Grid, useMediaQuery } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';


const AboutContainer = () => {
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    return (        //border: "3px solid crimson",
        <Grid container sx={{  marginBottom: "10%", minHeight: "80vh" }}>
            <Grid item xs={6} md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: isMobile ? "100%" : "60%",
                        backgroundColor: 'white',
                        border: "2px solid aqua"
                    }}
                >
                    <p className='about-para1'> about </p>
                    <DiamondIcon />
                    <p className='about-para2'> our shop </p>
                    <p className='about-para3'> Hello there, this is the brand new product of the company that will make you go like a lavender queen. Hope you enjoy the day and keep purchasing the latest trends from our company to become fashion icon. </p>
                    <p className='about-para3'> Hello there, this is the brand new product of the company that will make you go like a lavender queen. Hope you enjoy the day and keep purchasing the latest trends from our company to become fashion icon. </p>
                    <Button variant='contained' color='primary'> Read More </Button>
                </Box>
            </Grid>
            <Grid item xs={6} md={6}>
                <Box
                    sx={{
                        border: "2px solid aqua", height: "100%", width: isMobile ? "100%" : "60%", backgroundColor: '#E6E6FA', marginTop: "10%"
                    }}
                >
                    <img src="https://edensign.blob.core.windows.net/image-storage/makeup/brushes3.jpg" className='collection-img' alt="about-us" />
                </Box>
            </Grid>
        </Grid >
    )
}

export default AboutContainer;
