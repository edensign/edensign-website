/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box, IconButton } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import { useSelector } from "react-redux";

import locationImg from "../../assets/our_location.png"
// style={{ position: "absolute", left: "0", top: "0", height: "100%", width: "100%", zIndex: "-1" }}>
const TheLocations = () => {
    const { salon } = useSelector(state => state.salonDetail);

    return (
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-around" alignItems="center" sx={{ width: "93%", minHeight: { xs: "auto", md: "110vh" }, position: "relative", paddingLeft: "5%", margin: { xs: "10% 0", md: "2% 0 8% 0" }, fontFamily: "Inter, sans-serif", gap: { xs: 6, md: 0 } }}>
            <Box sx={{ width: { xs: "100%", md: "35%" }, display: "flex", flexDirection: "column", alignItems: "flex-start", position: "relative" }}>
                <span className="offer-line"></span>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "12px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "uppercase", marginTop: "20px" }}>Global salon chain</span>
                    <p style={{ fontWeight: "400", fontSize: "42px", fontFamily: "Marcellus, sans-serif", lineHeight: "0.05em", letterSpacing: "-0.04em", textTransform: "capitalize" }}>our locations</p>
                    <p style={{ fontWeight: "300", fontSize: "14px", lineHeight: "28px", letterSpacing: "0.05em" }}> {salon?.description || "Experience premium beauty services at our flagship location. We offer a wide range of services tailored to your needs."}</p>
                    {/* Address Section */}
                    <Box sx={{ display: "flex", alignItems: "flex-start", mt: 4, gap: 2.5 }}>
                        <Box sx={{ 
                            width: 48, height: 48, borderRadius: "50%", 
                            display: "flex", alignItems: "center", justifyContent: "center",
                            bgcolor: "rgba(199,149,108,0.1)", color: "#c7956c", flexShrink: 0 
                        }}>
                            <PlaceIcon sx={{ fontSize: "24px" }} />
                        </Box>
                        <Box>
                            <p style={{ fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", color: "#c7956c", margin: "0 0 4px 0" }}>Visit Us</p>
                            <p style={{ fontSize: "15px", color: "#1a0f08", lineHeight: "1.6", margin: 0 }}> 
                                {salon?.landmark ? `${salon.landmark}, ` : ''}
                                {salon?.street ? `${salon.street}, ` : ''}
                                {salon?.area ? `${salon.area}, ` : ''}
                                {salon?.city ? `${salon.city}, ` : ''}
                                {salon?.state ? `${salon.state}` : ''}
                                {salon?.pincode ? ` - ${salon.pincode}` : ''}
                            </p>
                        </Box>
                    </Box>

                    {/* Email Section */}
                    <Box sx={{ display: "flex", alignItems: "flex-start", mt: 3, gap: 2.5 }}>
                        <Box sx={{ 
                            width: 48, height: 48, borderRadius: "50%", 
                            display: "flex", alignItems: "center", justifyContent: "center",
                            bgcolor: "rgba(199,149,108,0.1)", color: "#c7956c", flexShrink: 0 
                        }}>
                            <MailIcon sx={{ fontSize: "22px" }} />
                        </Box>
                        <Box>
                            <p style={{ fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", color: "#c7956c", margin: "0 0 4px 0" }}>Email Us</p>
                            <p style={{ fontSize: "15px", color: "#1a0f08", margin: 0 }}>
                                {salon?.email || "info@edensign.com"}
                            </p>
                        </Box>
                    </Box>

                    {/* Social Links Section */}
                    <Box sx={{ display: "flex", gap: 1.5, mt: 5 }}>
                        {salon?.instagram_link && (
                            <IconButton href={salon.instagram_link} target="_blank" 
                                sx={{ 
                                    width: 40, height: 40, border: "1px solid rgba(199,149,108,0.2)",
                                    color: "#E1306C", "&:hover": { bgcolor: "rgba(225, 48, 108, 0.05)", borderColor: "#E1306C" } 
                                }}>
                                <InstagramIcon sx={{ fontSize: "18px" }} />
                            </IconButton>
                        )}
                        {salon?.facebook_link && (
                            <IconButton href={salon.facebook_link} target="_blank" 
                                sx={{ 
                                    width: 40, height: 40, border: "1px solid rgba(199,149,108,0.2)",
                                    color: "#1877F2", "&:hover": { bgcolor: "rgba(24, 119, 242, 0.05)", borderColor: "#1877F2" } 
                                }}>
                                <FacebookIcon sx={{ fontSize: "18px" }} />
                            </IconButton>
                        )}
                        {salon?.youtube_link && (
                            <IconButton href={salon.youtube_link} target="_blank" 
                                sx={{ 
                                    width: 40, height: 40, border: "1px solid rgba(199,149,108,0.2)",
                                    color: "#FF0000", "&:hover": { bgcolor: "rgba(255, 0, 0, 0.05)", borderColor: "#FF0000" } 
                                }}>
                                <YouTubeIcon sx={{ fontSize: "18px" }} />
                            </IconButton>
                        )}
                        {salon?.website_link && (
                            <IconButton href={salon.website_link} target="_blank" 
                                sx={{ 
                                    width: 40, height: 40, border: "1px solid rgba(199,149,108,0.2)",
                                    color: "#c7956c", "&:hover": { bgcolor: "rgba(199, 149, 108, 0.05)", borderColor: "#c7956c" } 
                                }}>
                                <LanguageIcon sx={{ fontSize: "18px" }} />
                            </IconButton>
                        )}
                    </Box>
                </Box>
            </Box>

            <Box sx={{ maxWidth: { xs: "100%", md: "40%" }, width: { xs: "100%", md: "39%" }, height: { xs: "350px", md: "70vh" }, position: "relative", display: "flex", flexWrap: "wrap", mt: { xs: 4, md: 0 } }}>
                <Box sx={{ position: "absolute", left: "0", top: "20px", zIndex: "1", height: "100%", width: "100%", borderRadius: "50%", boxShadow: "4px 4px 6px #800080, -4px -4px 6px #800080", overflow: "hidden", cursor: `url(https://maps.gstatic.com/mapfiles/openhand_8_8.cur), default`, touchAction: "pan-x pan-y" }}>
                    <iframe aria-hidden="true" allowFullScreen="" frameBorder="0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ width: "100%", height: "100%", border: 0 }}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.079569210787!2d79.4141265744352!3d28.38666459520531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a007b41b1eec35%3A0xc44ff0449ba21640!2sEden%20Signature!5e0!3m2!1sen!2sin!4v1690528770409!5m2!1sen!2sin">
                    </iframe>

                </Box>

            </Box>

            {/* <Box display="flex" flexDirection="column" width="18%" marginTop="-12%">
                <img src={locationImg} alt="brand" style={{ height: "auto", width: "246px", maxWidth: "100%", border: "none", borderRadius: "0", boxShadow: "none", aspectRatio: "240/641" }} />
            </Box> */}

        </Box>
    )
};

export default TheLocations;
