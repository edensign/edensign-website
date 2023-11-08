/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box, Button } from "@mui/material";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

import videoImg from "../../assets/video.png"
import video from "../../assets/salon_working.mp4"

const VideoSection = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "93vh", margin: "auto", marginBottom: "11%", position: "relative" }}>
            <Box sx={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", width: "37%", backgroundColor: "#ffffff", marginRight: "2%", boxShadow: "4px 4px 6px #800080, -4px -4px 6px #800080"
            }}>
                <span style={{ width: "1px", height: "48px", backgroundColor: "#c4c4c4", position: "absolute", top: "30px", left: "56px" }}></span>
                <p style={{ width: "72%", textAlign: "left", marginTop: "20px", fontWeight: "400", fontSize: "16px", lineHeight: "1.28", letterSpacing: "0.1em", textTransform: "uppercase" }}> luxury salon </p>
                <p style={{ width: "72%", textAlign: "left", fontWeight: "400", fontSize: "36px", fontFamily: "Marcellus, sans-serif", lineHeight: "1", letterSpacing: "0.1em", textTransform: "capitalize", marginTop: "6px" }}> get cozy. </p>
                <p style={{ width: "72%", textAlign: "left", marginTop: "-4px", fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.015em" }}> Welcome to our exquisite luxury salon, where indulgence meets elegance in every detail. As you step into our opulent sanctuary, you'll be enveloped in an atmosphere of refined sophistication and unparalleled comfort. Our salon is more than just a place for beauty treatments; it's a haven for rejuvenation and relaxation. </p>
                <Button type="submit" variant="outlined" onClick={e => e.preventDefault()}
                    sx={{ borderRadius: 0, width: "72%", marginTop: "20px", fontSize: "12px", letterSpacing: "0.2em", lineHeight: "2em", fontWeight: "600", padding: "20px", textTransform: "uppercase" }}>Discover More</Button>
            </Box>

            <Box sx={{ display: "flex", width: "75%", position: "relative", boxShadow: "4px 4px 6px #800080, -4px -4px 6px #800080" }}>
                <Box display="inline-block" position="inherit">
                    <img src={videoImg} alt="Salon video"
                        style={{
                            width: "1268px", maxWidth: "100%", aspectRatio: "1268 / 916", boxShadow: "none", border: "none", backgroundPosition: "center", backgroundSize: "cover", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", overflow: "clip"
                        }} />
                </Box>

                <a href={video} datatype="iframe" target="_blank"
                    style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", left: "0", top: "0", height: "100%", width: "100%", zIndex: "10" }}
                >
                    <PlayCircleFilledIcon sx={{
                        height: "124px", width: "124px", transition: "transform 0.5s ease-in-out", "&:hover": { transform: "scale(1.2)" },
                        "&:active": { color: "rgb(85, 26, 139)" }
                    }} />
                </a>
            </Box>
        </Box>
    )
};

export default VideoSection;
