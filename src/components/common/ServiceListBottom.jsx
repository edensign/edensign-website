/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import React, { useState } from 'react';
import { List, ListItem, Typography, Box } from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import image2 from "../assets/TQ.jpg";
import image1 from "../assets/NH1.jpg";
import image3 from "../assets/CB.jpg";

const ServiceListBottom = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const cards = [
        {
            icon: <SpaIcon sx={{ fontSize: "40px", color: '#c7956c', mb: 2 }} />,
            title: "all natural",
            image: image1,
            desc: "All the products that we manufacture are 99% natural and tested by lab technicians. Crafted for your absolute wellness."
        },
        {
            icon: <AutoAwesomeIcon sx={{ fontSize: "40px", color: '#c7956c', mb: 2 }} />,
            title: "Online Bookings",
            image: image2,
            desc: "Discover premium salons nearby and book appointments instantly. Enjoy a seamless, hassle-free grooming experience."
        },
        {
            icon: <CurrencyExchangeIcon sx={{ fontSize: "40px", color: '#c7956c', mb: 2 }} />,
            title: "10% cashback",
            image: image3,
            desc: "Earn 10% cashback on all salon bookings and beauty products, with a client-first money-back satisfaction guarantee."
        }
    ];

    return (
        <Box sx={{
            background: 'linear-gradient(180deg, #1a0f08 0%, #0d0500 100%)',
            pt: 8,
            pb: 10,
            px: { xs: 3, md: 8 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Typography sx={{
                fontFamily: 'Playfair Display, serif',
                fontSize: { xs: '28px', sm: '36px' },
                fontWeight: 700,
                letterSpacing: ".1em",
                color: "#c7956c",
                mb: 6,
                textAlign: "center",
                textTransform: 'uppercase'
            }}>
                What Makes Us Unique?
            </Typography>

            <List sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                width: "100%",
                maxWidth: "1200px",
                justifyContent: "space-around",
                alignItems: "center",
                padding: 0
            }}>
                {cards.map((card, idx) => (
                    <ListItem
                        key={idx}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        sx={{
                            flexDirection: "column",
                            justifyContent: "center",
                            borderRadius: "50%",
                            height: { xs: "320px", sm: "360px", md: "380px" },
                            width: { xs: "320px", sm: "360px", md: "380px" },
                            backgroundImage: `url(${card.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: '1.5px solid rgba(199, 149, 108, 0.3)',
                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                borderColor: '#c7956c'
                            }
                        }}
                    >
                        {/* Overlay */}
                        <Box sx={{
                            position: 'absolute',
                            inset: 0,
                            background: hoveredIndex === idx ? 'rgba(15, 10, 5, 0.9)' : 'rgba(15, 10, 5, 0.45)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            zIndex: 1
                        }} />

                        {/* Content */}
                        <Box sx={{
                            position: 'relative',
                            zIndex: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            px: 3,
                            textAlign: 'center',
                            color: '#ffffff'
                        }}>
                            <Box sx={{
                                transform: hoveredIndex === idx ? 'translateY(-10px)' : 'translateY(0)',
                                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                {card.icon}
                                <Typography sx={{
                                    fontFamily: 'Playfair Display, serif',
                                    fontWeight: 600,
                                    fontSize: { xs: '20px', sm: '24px' },
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    mb: 1
                                }}>
                                    {card.title}
                                </Typography>
                            </Box>

                            <Typography sx={{
                                opacity: hoveredIndex === idx ? 1 : 0,
                                maxHeight: hoveredIndex === idx ? '150px' : '0px',
                                transform: hoveredIndex === idx ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                color: '#e2d5c5',
                                fontSize: '14px',
                                lineHeight: '1.6',
                                overflow: 'hidden'
                            }}>
                                {card.desc}
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
};

export default ServiceListBottom;
