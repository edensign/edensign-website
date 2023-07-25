/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Button, Box, TextField } from '@mui/material';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import newsletterImg from "../assets/newsletter.jpg";


const Newsletter = () => {
    return (
        <Box sx={{ height: "66vh", width: "84vw", position: "relative", backgroundColor: "#ffffff", marginBottom: "10%", left: "7%" }}>
            <Box sx={{ width: "44%", paddingTop: "9%", display: "flex", justifyContent: "center", alignItems: "center" }} >
                <Box>
                    <MarkEmailReadOutlinedIcon sx={{ fontSize: "90px", opacity: "0.7", fontWeight: "400" }} />
                </Box>
                <Box sx={{ textAlign: "left", fontSize: "16px", lineHeight: "23px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "400" }}>
                    <span style={{ maxWidth: "130px", display: "inline-block" }}> subscribe  to our newsletter </span>
                </Box>
            </Box>
            <Box sx={{ width: "42%", height: "62vh", float: "right", backgroundColor: "#ffffff", backgroundImage: `url(${newsletterImg})`, backgroundPosition: "center left", backgroundRepeat: "no-repeat", backgroundSize: "cover", marginTop: "-17.65%", marginRight: "2%" }}>
            </Box>

            <Box component="form" sx={{
                width: "50%", display: "flex", flexDirection: "column", padding: "0 130px"
            }}>
                <p style={{ fontSize: "10px", fontWeight: "300", lineHeight: "30px", letterSpacing: "0.015em", color: "rgb(97,97,97)" }}> Get latest news, offers and discounts.</p>

                <Box display="flex" alignItems="flex-start" position="relative" width="31vw">
                    <input type="text" placeholder="Your Email" style={{
                        height: "36px", width: "75%", outline: "none", padding: "12px", fontSize: "10px", backgroundColor: "#f3f3f3", border: "2px solid #f3f3f3",
                    }} />
                    <Button type="submit" color='primary' variant='outlined' sx={{
                        borderRadius: "0", padding: "11px 23px", outline: "none", fontWeight: "400", fontSize: "10px", lineHeight: "1.2", textAlign: "center", letterSpacing: "0.265em"
                    }}> subscribe </Button>
                </Box>
            </Box>

        </Box >
    )
};

export default Newsletter;
