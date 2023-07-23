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
        <Grid container sx={{  marginBottom: "10%", minHeight: "80vh" }}>
            <Grid item xs={6} md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Box
                    sx={{
                        border: "2px solid aqua", height: "100%", width: isMobile ? "100%" : "60%"
                    }}
                >
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
                        width: isMobile ? "100%" : "60%",
                        backgroundColor: "white",
                        border: "2px solid aqua"
                    }}
                >
                    <p id='makeup-para3'> new collection </p>
                    <DiamondIcon />
                    <p className='makeup-heading'> lavender </p>
                    <p className='makeup-heading'> queen </p>
                    <p className='makeup-para'> Hello there, this is the brand new product of the company that will make you go like a lavender queen. Hope you enjoy the day and keep purchasing the latest trends from our company to become fashion icon. </p>
                    <p className='makeup-para'> Hello there, this is the brand new product of the company that will make you go like a lavender queen. Hope you enjoy the day and keep purchasing the latest trends from our company to become fashion icon. </p>
                    <Button variant='contained' color='primary'> Read More </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ImageContainer;
