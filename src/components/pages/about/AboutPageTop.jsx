/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import AboutBg from "../../assets/eden-signature.png";

const AboutPageTop = () => {
    return (
        <Box sx={{
            position: 'relative',
            height: '60vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${AboutBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(26,10,0,0.3) 0%, rgba(26,10,0,0.75) 100%)',
                zIndex: 1
            }
        }}>
            <Box sx={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                color: '#fff',
                px: 3,
                maxWidth: '800px',
            }}>
                <Typography sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: '#c7956c',
                    mb: 2,
                }}>
                    about edensign
                </Typography>
                <Typography variant="h1" sx={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: { xs: '32px', sm: '48px', md: '56px' },
                    fontWeight: 700,
                    lineHeight: 1.2,
                    mb: 2,
                    color: '#fff',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}>
                    A Sanctuary of Beauty & Self-Confidence
                </Typography>
                <div style={{ width: '60px', height: '2px', background: '#c7956c', margin: '0 auto 20px' }} />
                <Typography sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: { xs: '14px', sm: '16px' },
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: '1.6',
                    fontWeight: 300,
                }}>
                    Discover our story, values, and dedication to crafting exceptional salon experiences that empower you to look and feel your absolute best.
                </Typography>
            </Box>
        </Box >
    )
};

export default AboutPageTop;
