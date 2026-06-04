/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';

const AboutCEO = () => {
    return (
        <Grid container spacing={4} sx={{ mb: 12, minHeight: "55vh", maxWidth: '1200px', margin: '0 auto', px: { xs: 3, md: 0 }, alignItems: 'stretch' }}>
            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: 'center' }}>
                <Box
                    sx={{ 
                        height: { xs: "320px", sm: "450px" }, 
                        width: "100%", 
                        overflow: "hidden",
                        borderRadius: "24px",
                        boxShadow: "0 15px 45px rgba(26, 10, 0, 0.1)",
                        border: "1px solid rgba(199, 149, 108, 0.15)"
                    }}>
                    <img 
                        src="https://f2fintech-hrms.s3.eu-north-1.amazonaws.com/eden-sign/edensign-website_images/makeup/skincare-closeup.jpg" 
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: 'transform 0.5s ease' }} 
                        alt="ceo-makeup-closeup" 
                        loading="lazy"
                        className="es-hover-scale"
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        background: "rgba(255, 255, 255, 0.7)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(199, 149, 108, 0.15)",
                        borderRadius: "24px",
                        p: { xs: 4, sm: 6 },
                        boxShadow: "0 8px 30px rgba(26, 10, 0, 0.03)",
                        textAlign: "center"
                    }}>
                    <Typography sx={{ 
                        fontFamily: "Inter, sans-serif", 
                        fontWeight: 600, 
                        fontSize: "11px", 
                        letterSpacing: "0.4em", 
                        textTransform: "uppercase", 
                        color: "#c7956c",
                        mb: 1.5
                    }}> 
                        Hello From 
                    </Typography>
                    <DiamondIcon sx={{ fontSize: "12px", color: '#c7956c', mb: 1.5 }} />
                    <Typography sx={{ 
                        fontFamily: 'Playfair Display, serif',
                        fontWeight: 700, 
                        fontSize: "28px", 
                        lineHeight: "1.2", 
                        letterSpacing: "0.08em", 
                        textTransform: "uppercase", 
                        color: "#1a0f08",
                        mb: 3
                    }}> 
                        CEO 
                    </Typography>
                    <Typography sx={{ 
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400, 
                        fontSize: "14.5px", 
                        lineHeight: "1.8", 
                        color: "#6b5749", 
                        mb: 2 
                    }}> 
                        Hello there, this is your ultimate destination for effortless salon appointment bookings! We bridge the gap between clients and salons, making beauty and grooming services accessible with just a few clicks. Whether you're looking for a haircut, spa treatment, or a complete makeover, we've got you covered. 
                    </Typography>
                    <Typography sx={{ 
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400, 
                        fontSize: "14.5px", 
                        lineHeight: "1.8", 
                        color: "#6b5749" 
                    }}> 
                        Our user-friendly platform helps you discover top-rated salons, view their services, check availability, and book your appointment instantly. Designed with convenience in mind, Eden Sign ensures a seamless experience for both clients and salon professionals. 
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default AboutCEO;
