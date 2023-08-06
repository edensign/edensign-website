/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box, List, ListItemButton, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';

import loreal from "../assets/brands/loreal.jpg"
import aerin from "../assets/brands/aerin.jpg"
import mac from "../assets/brands/mac.jpg"
import fable from "../assets/brands/fable.jpg"
import schwar from "../assets/brands/schwar.jpg"
import revlon from "../assets/brands/revlon.png"

import bg from "../assets/brands/bg2.png"

import img from "../assets/brandImg/brandImg.jpg"
import img2 from "../assets/brandImg/brandImg2.jpg"
import img3 from "../assets/brandImg/brandImg3.jpg"
import img4 from "../assets/brandImg/brandImg4.jpg"
import img5 from "../assets/brandImg/brandImg5.jpg"
import img6 from "../assets/brandImg/brandImg6.jpg"

const Brands = () => {
    //border: "1px solid black",
    return (
        <Box sx={{ height: "96vh", width: "100%", marginBottom: "8%", position: "relative" }}>
            <Box display="flex" justifyContent="center" marginBottom="6%"
                sx={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundRepeat: "repeat" }}>
                <List component='nav' sx={{ display: "inline-flex", alignItems: "center" }}>
                    <ListItemButton sx={{ "&:hover": { background: "transparent" } }}>
                        <Box sx={{
                            height: "20px", width: "108px", padding: "8px 25px", backgroundImage: `url(${loreal})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", opacity: "0.4", transition: "all 0.2s ease",
                            "&:hover": { opacity: "1", transform: "scale(1.2)" }
                        }} />
                    </ListItemButton>
                    <ListItemButton sx={{ "&:hover": { background: "transparent" } }}>
                        <Box sx={{
                            height: "20px", width: "100px", padding: "8px 25px", backgroundImage: `url(${aerin})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", opacity: "0.4", transition: "all 0.2s ease",
                            "&:hover": { opacity: "1", transform: "scale(1.2)" }
                        }} />
                    </ListItemButton>
                    <ListItemButton sx={{ "&:hover": { background: "transparent" } }}>
                        <Box sx={{
                            height: "20px", width: "140px", padding: "8px 25px", backgroundImage: `url(${mac})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", opacity: "0.4", transition: "all 0.2s ease",
                            "&:hover": { opacity: "1", transform: "scale(1.2)" }
                        }} />
                    </ListItemButton>


                    <Box sx={{
                        display: "flex", justifyContent: "center", paddingRight: "10px", opacity: "0.8", transition: "all 0.2s ease",
                        "&:hover": { opacity: "1", transform: "scale(1.2)" }
                    }}>
                        <span className="eden-signature">&nbsp;Eden signature</span>
                    </Box>


                    <ListItemButton sx={{ "&:hover": { background: "transparent" } }}>
                        <Box sx={{
                            height: "48px", width: "130px", padding: "8px 25px", backgroundImage: `url(${revlon})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", opacity: "0.4", transition: "all 0.2s ease",
                            "&:hover": { opacity: "1", transform: "scale(1.2)" }
                        }} />
                    </ListItemButton>
                    <ListItemButton sx={{ "&:hover": { background: "transparent" } }}>
                        <Box sx={{
                            height: "20px", width: "180px", padding: "8px 25px", backgroundImage: `url(${fable})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", opacity: "0.4", transition: "all 0.2s ease",
                            "&:hover": { opacity: "1", transform: "scale(1.2)" }
                        }} />
                    </ListItemButton>
                    <ListItemButton sx={{ "&:hover": { background: "transparent" } }}>
                        <Box sx={{
                            height: "76px", width: "150px", padding: "8px 35px", backgroundImage: `url(${schwar})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", opacity: "0.4", transition: "all 0.2s ease",
                            "&:hover": { opacity: "1", transform: "scale(1.2)" }
                        }} />
                    </ListItemButton>
                </List>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center">
                <Box sx={{
                    height: "40vh", width: "18%", backgroundImage: `url(${img})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"
                }} />
                <Box sx={{
                    height: "40vh", width: "18%", backgroundImage: `url(${img2})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", marginTop: "8%"
                }} />
                <Box sx={{
                    height: "40vh", width: "18%", backgroundImage: `url(${img3})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", marginTop: "-8%"
                }} />
                <Box sx={{
                    height: "40vh", width: "18%", backgroundImage: `url(${img4})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", marginTop: "14%"
                }} />
                <Box sx={{
                    height: "40vh", width: "18%", backgroundImage: `url(${img5})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", marginTop: "-4%"
                }} />
                <Box sx={{
                    height: "40vh", width: "18%", backgroundImage: `url(${img6})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", marginTop: "8%"
                }} />
            </Box>
            <Box sx={{
                height: "50vh", width: "24%", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "absolute", left: "38%", top: "32%", opacity: "0.9", "&:hover": { color: "#ffdde1", cursor: "pointer" }
            }}>
                <InstagramIcon sx={{ height: "18px", width: "18px", fontSize: "18px", lineHeight: "1", display: "block", borderColor: "#868686" }} />
                <Typography sx={{
                    textTransform: "uppercase", letterSpacing: "0.5em", fontSize: "16px", fontFamily: "Marcellus,sans-serif", fontWeight: "400", lineHeight: "28px", paddingTop: "10px"
                }}>
                    instagram </Typography>
                <Typography sx={{
                    textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "12px", fontFamily: "Inter, sans-serif", lineHeight: "25px"
                }}>
                    @edensign </Typography>
            </Box>
        </Box>
    )
};

export default Brands;
