/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box, List, ListItemText } from "@mui/material";
import salonImg from "../../assets/pos.png";

const Facilities = () => {
    return (
        <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ width: "100%", position: "relative", marginBottom: "11%", fontFamily: "Inter, sans-serif" }}>
            <Box display="flex" flexDirection="column" textAlign="right" width="29%">
                <nav aria-label="services provided by this website">
                    <List className="facilities-list-left">
                        <ListItemText primary="Skilled Professionals" primaryTypographyProps={{ fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em", textTransform: "uppercase" }} />
                        <span style={{ paddingLeft: "80px", marginTop: "4px", fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                            We offer skilled hairstylists, colorists, makeup artists, and aestheticians, who stay updated with the latest trends and techniques.
                        </span>

                        <ListItemText primary="Customizable Packages" primaryTypographyProps={{ marginTop: "48px", fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em" }} />
                        <span style={{ paddingLeft: "80px", fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                            Clients can often choose from a variety of packages that combine different services for a comprehensive and indulgent spa day.
                        </span>

                        <ListItemText primary="Relaxation Areas" primaryTypographyProps={{ marginTop: "48px", fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em" }} />
                        <span style={{ paddingLeft: "80px", fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                            We provide designated relaxation areas where clients can unwind before or after their treatments.
                        </span>
                    </List>
                </nav>
            </Box>

            <Box className="facilities-img-box">
                <img src={salonImg} alt="brand" style={{ height: "auto", width: "276px", maxWidth: "100%", border: "none", borderRadius: "0", boxShadow: "none", aspectRatio: "auto 276/641" }} />
            </Box>

            <Box display="flex" flexDirection="column" width="29%">
                <nav aria-label="services provided by this website">
                    <List className="facilities-list-right">
                        <ListItemText primary="Aromatherapy" primaryTypographyProps={{ fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em", textTransform: "uppercase" }} />
                        <span style={{ paddingRight: "45px", fontWeight: "300", marginTop: "4px", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                            Incorporating aromatic essential oils into treatments like massages and facials enhances the overall sensory experience and relaxation.
                        </span>

                        <ListItemText primary="High-Tech Beauty Treatments" primaryTypographyProps={{ marginTop: "48px", fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em" }} />
                        <span style={{ paddingRight: "45px", fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                            We offer advanced beauty treatments like LED light therapy, microcurrent facials, and radiofrequency skin tightening.
                        </span>

                        <ListItemText primary="Signature Haircuts and Styling" primaryTypographyProps={{ marginTop: "48px", fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em" }} />
                        <span style={{ paddingRight: "45px", fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                            We offer personalized and expertly executed haircuts and styling using high-quality products and techniques tailored to the client's preferences and facial features.
                        </span>
                    </List>
                </nav>
            </Box>
        </Box>
    )
};

export default Facilities;
