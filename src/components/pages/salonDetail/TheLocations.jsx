/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { Box, IconButton, Typography } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import { useSelector } from "react-redux";

const TheLocations = () => {
    const { salon } = useSelector(state => state.salonDetail);

    // Build the query string for Google Maps search or embed using coordinates/address
    // Fallback to defaults if coordinates aren't set
    const mapEmbedSrc = salon?.latitude && salon?.longitude 
        ? `https://maps.google.com/maps?q=${salon.latitude},${salon.longitude}&z=15&output=embed`
        : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.079569210787!2d79.4141265744352!3d28.38666459520531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a007b41b1eec35%3A0xc44ff0449ba21640!2sEden%20Signature!5e0!3m2!1sen!2sin!4v1690528770409!5m2!1sen!2sin";

    return (
        <Box 
            sx={{ 
                width: "90%", 
                maxWidth: "1200px",
                margin: { xs: "80px auto", md: "100px auto" }, 
                fontFamily: "'Inter', sans-serif",
                color: "var(--es-charcoal)"
            }}
        >
            <Box 
                display="flex" 
                flexDirection={{ xs: "column", md: "row" }} 
                justifyContent="space-between" 
                alignItems="stretch" 
                gap={{ xs: 6, md: 8 }}
            >
                {/* Left Side: Info details */}
                <Box 
                    sx={{ 
                        width: { xs: "100%", md: "45%" }, 
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center",
                        position: "relative" 
                    }}
                >
                    <Box 
                        className="section-label" 
                        sx={{ 
                            fontSize: "11px", 
                            fontWeight: "600", 
                            letterSpacing: "3px", 
                            textTransform: "uppercase", 
                            color: "var(--es-emerald-soft)", 
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            "&::before": {
                                content: '""',
                                width: "24px",
                                height: "1px",
                                bgcolor: "var(--es-emerald)"
                            }
                        }}
                    >
                        Global Salon Chain
                    </Box>

                    <Typography 
                        variant="h2" 
                        sx={{ 
                            fontWeight: "400", 
                            fontSize: { xs: "36px", md: "46px" }, 
                            fontFamily: "'Cormorant Garamond', serif", 
                            lineHeight: "1.1", 
                            letterSpacing: "-0.02em", 
                            textTransform: "capitalize",
                            mb: 3
                        }}
                    >
                        our locations
                    </Typography>

                    <Typography 
                        sx={{ 
                            fontWeight: "300", 
                            fontSize: "15px", 
                            lineHeight: "1.8", 
                            letterSpacing: "0.02em", 
                            color: "var(--es-charcoal-60)",
                            mb: 4 
                        }}
                    >
                        {salon?.description || "Experience premium beauty services at our flagship location. We offer a wide range of services tailored to your needs."}
                    </Typography>

                    {/* Info Cards / Items */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
                        {/* Address Card */}
                        <Box 
                            sx={{ 
                                display: "flex", 
                                alignItems: "flex-start", 
                                gap: 2.5,
                                padding: "20px",
                                borderRadius: "16px",
                                background: "rgba(15,93,78,0.04)",
                                border: "1px solid rgba(15,93,78,0.15)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    background: "rgba(15,93,78,0.07)",
                                    transform: "translateY(-2px)"
                                }
                            }}
                        >
                            <Box sx={{ 
                                width: 46, height: 46, borderRadius: "12px", 
                                display: "flex", alignItems: "center", justifyContent: "center",
                                bgcolor: "rgba(15,93,78,0.12)", color: "var(--es-emerald-soft)", flexShrink: 0 
                            }}>
                                <PlaceIcon sx={{ fontSize: "22px" }} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--es-emerald-soft)", margin: "0 0 6px 0" }}>
                                    Visit Us
                                </Typography>
                                <Typography sx={{ fontSize: "14px", color: "var(--es-charcoal)", lineHeight: "1.6", fontWeight: "400" }}> 
                                    {salon?.landmark ? `${salon.landmark}, ` : ''}
                                    {salon?.street ? `${salon.street}, ` : ''}
                                    {salon?.area ? `${salon.area}, ` : ''}
                                    {salon?.city ? `${salon.city}, ` : ''}
                                    {salon?.state ? `${salon.state}` : ''}
                                    {salon?.pincode ? ` - ${salon.pincode}` : ''}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Email Card */}
                        <Box 
                            sx={{ 
                                display: "flex", 
                                alignItems: "flex-start", 
                                gap: 2.5,
                                padding: "20px",
                                borderRadius: "16px",
                                background: "rgba(15,93,78,0.04)",
                                border: "1px solid rgba(15,93,78,0.15)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    background: "rgba(15,93,78,0.07)",
                                    transform: "translateY(-2px)"
                                }
                            }}
                        >
                            <Box sx={{ 
                                width: 46, height: 46, borderRadius: "12px", 
                                display: "flex", alignItems: "center", justifyContent: "center",
                                bgcolor: "rgba(15,93,78,0.12)", color: "var(--es-emerald-soft)", flexShrink: 0 
                            }}>
                                <MailIcon sx={{ fontSize: "20px" }} />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--es-emerald-soft)", margin: "0 0 6px 0" }}>
                                    Email Us
                                </Typography>
                                <Typography 
                                    component="a"
                                    href={`mailto:${salon?.email || "info@edensign.com"}`}
                                    sx={{ 
                                        fontSize: "14px", 
                                        color: "var(--es-charcoal)", 
                                        fontWeight: "400",
                                        textDecoration: "none",
                                        transition: "color 0.2s",
                                        "&:hover": { color: "var(--es-emerald-soft)" }
                                    }}
                                >
                                    {salon?.email || "info@edensign.com"}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Social Links */}
                    <Box sx={{ display: "flex", gap: 2, mt: 4, pl: 1 }}>
                        {salon?.instagram_link && (
                            <IconButton href={salon.instagram_link} target="_blank" 
                                sx={{ 
                                    width: 42, height: 42, 
                                    border: "1px solid rgba(15,93,78,0.25)",
                                    borderRadius: "10px",
                                    color: "#E1306C", 
                                    transition: "all 0.3s",
                                    "&:hover": { 
                                        bgcolor: "rgba(225, 48, 108, 0.08)", 
                                        borderColor: "#E1306C",
                                        transform: "translateY(-3px)" 
                                    } 
                                }}>
                                <InstagramIcon sx={{ fontSize: "19px" }} />
                            </IconButton>
                        )}
                        {salon?.facebook_link && (
                            <IconButton href={salon.facebook_link} target="_blank" 
                                sx={{ 
                                    width: 42, height: 42, 
                                    border: "1px solid rgba(15,93,78,0.25)",
                                    borderRadius: "10px",
                                    color: "#1877F2", 
                                    transition: "all 0.3s",
                                    "&:hover": { 
                                        bgcolor: "rgba(24, 119, 242, 0.08)", 
                                        borderColor: "#1877F2",
                                        transform: "translateY(-3px)" 
                                    } 
                                }}>
                                <FacebookIcon sx={{ fontSize: "19px" }} />
                            </IconButton>
                        )}
                        {salon?.youtube_link && (
                            <IconButton href={salon.youtube_link} target="_blank" 
                                sx={{ 
                                    width: 42, height: 42, 
                                    border: "1px solid rgba(15,93,78,0.25)",
                                    borderRadius: "10px",
                                    color: "#FF0000", 
                                    transition: "all 0.3s",
                                    "&:hover": { 
                                        bgcolor: "rgba(255, 0, 0, 0.08)", 
                                        borderColor: "#FF0000",
                                        transform: "translateY(-3px)" 
                                    } 
                                }}>
                                <YouTubeIcon sx={{ fontSize: "19px" }} />
                            </IconButton>
                        )}
                        {salon?.website_link && (
                            <IconButton href={salon.website_link} target="_blank" 
                                sx={{ 
                                    width: 42, height: 42, 
                                    border: "1px solid rgba(15,93,78,0.25)",
                                    borderRadius: "10px",
                                    color: "var(--es-emerald-soft)", 
                                    transition: "all 0.3s",
                                    "&:hover": { 
                                        bgcolor: "rgba(15, 93, 78, 0.08)", 
                                        borderColor: "var(--es-emerald-soft)",
                                        transform: "translateY(-3px)" 
                                    } 
                                }}>
                                <LanguageIcon sx={{ fontSize: "19px" }} />
                            </IconButton>
                        )}
                    </Box>
                </Box>

                {/* Right Side: Map Frame */}
                <Box 
                    sx={{ 
                        flex: 1,
                        minHeight: { xs: "320px", md: "520px" }, 
                        position: "relative",
                        borderRadius: "24px",
                        border: "1px solid rgba(15, 93, 78, 0.25)",
                        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.08)",
                        overflow: "hidden",
                        background: "var(--es-cream)",
                        display: "flex",
                        alignItems: "stretch"
                    }}
                >
                    <iframe 
                        title="Salon Location Map"
                        aria-hidden="true" 
                        allowFullScreen="" 
                        frameBorder="0" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade" 
                        style={{ 
                            width: "100%", 
                            height: "100%", 
                            border: 0,
                            display: "block" 
                        }}
                        src={mapEmbedSrc}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default TheLocations;
