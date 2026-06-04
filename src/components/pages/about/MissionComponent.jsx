/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import React from 'react';
import { Box, Grid, Typography, Card } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';

const MissionComponent = () => {
  return (
    <Box sx={{ position: "relative", py: 10, px: { xs: 3, md: 8 }, background: 'transparent' }}>
      <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", mb: 8 }}>
        <Typography sx={{
            fontFamily: "Inter, sans-serif", 
            fontWeight: 600, 
            fontSize: "11px", 
            lineHeight: "1", 
            letterSpacing: "0.4em",
            color: '#c7956c',
            textTransform: 'uppercase',
            mb: 1.5
        }}>
            OUR
        </Typography>
        <DiamondIcon sx={{ fontSize: "12px", color: '#c7956c', mb: 1.5 }} />
        <Typography sx={{
            fontFamily: "Playfair Display, serif",
            fontSize: { xs: '28px', sm: '36px' }, 
            fontWeight: 700, 
            lineHeight: "1.2", 
            letterSpacing: "0.08em",
            color: '#1a0f08',
            textTransform: 'uppercase'
        }}>
            MISSION
        </Typography>
        <div style={{ width: '48px', height: '1.5px', background: '#c7956c', marginTop: '16px' }} />
      </Box>

      <Grid container spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Grid item xs={12} md={6}>
          <Card sx={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(199, 149, 108, 0.12)',
            borderRadius: '20px',
            p: { xs: 4, sm: 5 },
            boxShadow: '0 8px 30px rgba(26, 10, 0, 0.03)',
            height: '100%',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 40px rgba(199, 149, 108, 0.1)',
                borderColor: '#c7956c',
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <DiamondIcon sx={{ fontSize: 16, color: '#c7956c' }} />
                <Typography sx={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: '#1a0f08' }}>
                    Exceptional Experiences
                </Typography>
            </Box>
            <Typography sx={{
              color: "#6b5749", 
              fontWeight: 400, 
              fontFamily: "Inter, sans-serif", 
              fontSize: "14.5px", 
              lineHeight: "1.8", 
              letterSpacing: "0.02em"
            }}>
              At "Eden Sign", our mission is to deliver exceptional salon experiences that empower our clients to look and feel their best. We are dedicated to providing top-quality services that prioritize customer satisfaction, innovation, and inclusivity. Through a commitment to excellence, sustainability, and community engagement, we strive to be the trusted destination for beauty, self-confidence, and well-being. We believe beauty is about embracing one's uniqueness.
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(199, 149, 108, 0.12)',
            borderRadius: '20px',
            p: { xs: 4, sm: 5 },
            boxShadow: '0 8px 30px rgba(26, 10, 0, 0.03)',
            height: '100%',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 40px rgba(199, 149, 108, 0.1)',
                borderColor: '#c7956c',
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <DiamondIcon sx={{ fontSize: 16, color: '#c7956c' }} />
                <Typography sx={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: '#1a0f08' }}>
                    Transformation & Trust
                </Typography>
            </Box>
            <Typography sx={{
              color: "#6b5749", 
              fontWeight: 400, 
              fontFamily: "Inter, sans-serif", 
              fontSize: "14.5px", 
              lineHeight: "1.8", 
              letterSpacing: "0.02em"
            }}>
              Our client-centric approach and eco-friendly practices define our salon's character. We aim to create a welcoming and diverse space where individuals can confidently express themselves, knowing that they are in the hands of skilled professionals who care deeply about their needs and preferences. We are more than just a salon franchise; we are a destination for transformation, self-expression, and empowerment.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MissionComponent;
