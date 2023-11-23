/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box, List, ListItem, ListItemButton, ListItemText, Typography, useTheme } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CallIcon from '@mui/icons-material/Call';
import PlaceIcon from '@mui/icons-material/Place';
import MailIcon from '@mui/icons-material/Mail';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

import { tokens } from "../../theme";
import bg from "../assets/footer_bg.jpg";

function Footer() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleInstagramClick = () => {
        window.open('https://instagram.com/edensign.in?igshid=NzZlODBkYWE4Ng==', '_blank');
    };

    return (
        <Box color="white" id="bottom-bar" position="relative" sx={{ backgroundImage: `url(${bg})`, backgroundPosition: "center center", backgroundRepeat: "repeat", backgroundSize: "300px auto", padding: "20px 0" }}>
            <Box display="flex" justifyContent="center">
                <List component='nav' sx={{ display: "inline-flex", alignItems: "flex-start" }}>
                    <ListItemButton className="list">
                        <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemText primary="ABOUT " sx={{ marginRight: "30px" }} primaryTypographyProps={{
                                fontWeight: "500", fontSize: "12px", fontFamily: "Inter, sans-serif", lineHeight: "1", letterSpacing: "0.13em"
                            }} />  </Link>
                        <FiberManualRecordIcon sx={{ fontSize: "4px" }} />
                    </ListItemButton>
                    <ListItemButton className="list">
                        <ListItemText primary="OUR TEAM" sx={{ marginRight: "30px" }} primaryTypographyProps={{
                            fontWeight: "500", fontSize: "12px", fontFamily: "Inter, sans-serif", lineHeight: "1", letterSpacing: "0.13em"
                        }} />
                        <FiberManualRecordIcon sx={{ fontSize: "4px" }} />
                    </ListItemButton>
                    <ListItemButton className="list">
                        <ListItemText primary="FAQ" sx={{ marginRight: "30px" }} primaryTypographyProps={{
                            fontWeight: "500", fontSize: "12px", fontFamily: "Inter, sans-serif", lineHeight: "1", letterSpacing: "0.13em"
                        }} />
                        <FiberManualRecordIcon sx={{ fontSize: "4px" }} />
                    </ListItemButton>
                    <ListItemButton className="list">
                        <ListItemText primary="MAINTENANCE MODE" sx={{ marginRight: "30px" }} primaryTypographyProps={{
                            fontWeight: "500", fontSize: "12px", fontFamily: "Inter, sans-serif", lineHeight: "1", letterSpacing: "0.13em"
                        }} />
                        <FiberManualRecordIcon sx={{ fontSize: "4px" }} />
                    </ListItemButton>
                    <ListItemButton className="list">
                        <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemText primary="CONTACT" primaryTypographyProps={{
                                fontWeight: "500", fontSize: "12px", fontFamily: "Inter, sans-serif", lineHeight: "1", letterSpacing: "0.13em"
                            }} /></Link>
                    </ListItemButton>
                </List>
            </Box>

            <Box display="flex" justifyContent="space-around" sx={{ paddingTop: "3%", width: "100%" }}>
                <Box>
                    <List component='nav'>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ padding: "0 10px" }}>
                                <CallIcon sx={{ fontSize: "0.9em", marginRight: "10px" }} />
                                <ListItemText primary="123 488 6532" primaryTypographyProps={{ fontSize: "12px", letterSpacing: "0.55px", lineHeight: "14px", fontWeight: "400" }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItemButton sx={{ padding: "0 10px" }}>
                            <PlaceIcon sx={{ fontSize: "0.9em", marginRight: "10px" }} />
                            <ListItemText primary="25 West 21th Street, Miami Fl, USA" primaryTypographyProps={{ fontSize: "12px", letterSpacing: "0.55px", lineHeight: "14px", fontWeight: "400" }} />
                        </ListItemButton>
                        <ListItemButton sx={{ padding: "0 10px" }}>
                            <MailIcon sx={{ fontSize: "0.9em", marginRight: "10px" }} />
                            <ListItemText primary="info@edensign.com" primaryTypographyProps={{ fontSize: "12px", letterSpacing: "0.55px", lineHeight: "14px", fontWeight: "400" }} />
                        </ListItemButton>
                        <ListItemButton sx={{ padding: "0 10px" }}>
                            <ScheduleIcon sx={{ fontSize: "0.9em", marginRight: "10px" }} />
                            <ListItemText primary="Mon-Fri: 10:00-18:00" primaryTypographyProps={{ fontSize: "12px", letterSpacing: "0.55px", lineHeight: "14px", fontWeight: "400" }} />
                        </ListItemButton>
                    </List>
                </Box>
                <Box marginTop="2%">
                    <Typography variant="h3" sx={{
                        textTransform: "uppercase", letterSpacing: "0.4rem", fontSize: "1.4rem", fontFamily: "Inter, sans-serif", lineHeight: "1.6"
                    }}> edensign </Typography>
                    <List component='nav' sx={{
                        display: "inline-flex", color: colors.redAccent[800], width: "90%"
                    }}>
                        <ListItemButton className="list" sx={{ paddingRight: "7px" }} >
                            <FacebookIcon sx={{ fontSize: "14px", "&:hover": { color: "#ffffff" } }} />
                        </ListItemButton>
                        <ListItemButton className="list" sx={{ paddingRight: "7px" }} onClick={handleInstagramClick} >
                            <InstagramIcon sx={{ fontSize: "14px", "&:hover": { color: "#ffffff" } }} />
                        </ListItemButton>
                        <ListItemButton className="list" sx={{ paddingRight: "7px" }}>
                            <TwitterIcon sx={{ fontSize: "14px", "&:hover": { color: "white" } }} />
                        </ListItemButton>
                        <ListItemButton className="list">
                            <YouTubeIcon sx={{ fontSize: "14px", "&:hover": { color: "white" } }} />
                        </ListItemButton>
                    </List>
                </Box>
                <Box sx={{ width: "16%" }}>
                    <Typography sx={{
                        fontFamily: "Inter, sans-serif", color: "#868686", textAlign: "right", fontSize: "12px", fontWeight: "400", letterSpacing: "0.6px"
                    }}>
                        Hello there, hope you enjoy the day and keep purchasing the latest trends from our company to become...<br /><kbd style={{ float: "right", color: "white" }}>READ MORE</kbd>
                    </Typography>
                </Box>
            </Box>

            <Box sx={{
                display: "flex", justifyContent: "space-between", width: "80.5%", height: "10vh", margin: "auto", paddingTop: "3%"
            }}>
                <Typography sx={{
                    color: "#868686", fontSize: "11px", textAlign: "left", fontWeight: "400", letterSpacing: "0.275px", lineHeight: "1em"
                }}>
                    &copy; 2023 EDENSIGN Theme. All Rights Reserved.
                </Typography>
                <List component='nav' sx={{ display: "inline-flex", padding: "0", marginRight: "-34px" }}>
                    <ListItemButton className="list">
                        <Link to="/privacy-policy" style={{ textDecoration: 'none', color: 'inherit' }} >
                            <ListItemText primary="PRIVACY POLICY" primaryTypographyProps={{
                                fontSize: "11px", marginRight: "10px"
                            }} /></Link>

                        <FiberManualRecordIcon sx={{ fontSize: "4px" }} />
                    </ListItemButton>
                    <ListItemButton className="list" sx={{ paddingLeft: "0" }}>
                        <ListItemText primary="TERMS" primaryTypographyProps={{
                            fontSize: "11px", marginRight: "10px"
                        }} />
                        <FiberManualRecordIcon sx={{ fontSize: "4px" }} />
                    </ListItemButton>
                    <ListItemButton className="list" sx={{ paddingLeft: "0" }}>
                        <Link to="/faq" style={{textDecoration:"none",color:"inherit"}}>
                        <ListItemText primary="FAQ" primaryTypographyProps={{ fontSize: "11px" }} />
                        </Link>
                    </ListItemButton>
                </List>
            </Box>
        </Box >
    )
}

export default Footer;
