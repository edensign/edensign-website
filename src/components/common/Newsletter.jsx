/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Button, Grid, Box, TextField, Typography } from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Newsletter from "../../../../edensign-website_images/makeup/newsletter.jpg";


function BodyNewsletter() {
    return (
        <Box sx={{ position: "relative" }}>
            <Box sx={{ width: 600, height: 400 }}  >
                <p> subscribe </p>
                <p> to our </p>
                <p> newsletter </p>
                <MarkEmailReadIcon />
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '40ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography component="h6" sx={{ color: "grey" }}> Get latest news, offers and discounts.</Typography>
                    <TextField id="filled-basic" label="Your Email" variant="filled" />
                    <Button sx={{ background: 'transparent', color: "#000", border: "1px solid black", marginTop: "10px" }}> subscribe </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    width: 500,
                    height: 400,
                    borderRight: "3px solid #E6E6FA"
                }}
            >
                {/* <img src={Subscribe} className='newsletter-image' alt='This is the an image' /> */}
            </Box>
        </Box>
    )
}

export default BodyNewsletter;
