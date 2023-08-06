/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box, List, ListItemText } from "@mui/material";
import augustine from "../../assets/salon-detail.png";

const Facilities = () => {
    return (
        <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ width: "100%", position: "relative", marginBottom: "11%", fontFamily: "Inter, sans-serif" }}>
            <Box display="flex" flexDirection="column" textAlign="right" width="29%">
                <nav aria-label="services provided by this website">
                    <List className="facilities-list-left">
                        <ListItemText primary="free shipping" primaryTypographyProps={{ fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em", textTransform: "uppercase" }} />
                        <span style={{ paddingLeft: "80px", marginTop: "4px", fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                            For county now sister engage had season better had waited. Occasional mrs interested.
                        </span>

                        <ListItemText primary="24/7 SUPPORT" primaryTypographyProps={{ marginTop: "48px", fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em" }} />
                        <span style={{ paddingLeft: "80px", fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                            Our team members work for 24/7 to provide you the best experience with most simplicity.
                        </span>

                        <ListItemText primary="MONEY BACK" primaryTypographyProps={{ marginTop: "48px", fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em" }} />
                        <span style={{ paddingLeft: "80px", fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                            We provide 100% money back guarantee within 2 days of purchase if defect is there.
                        </span>
                    </List>
                </nav>
            </Box>

            <Box className="facilities-img-box">
                <img src={augustine} alt="brand" style={{ height: "auto", width: "276px", maxWidth: "100%", border: "none", borderRadius: "0", boxShadow: "none", aspectRatio: "auto 276/641" }} />
            </Box>

            <Box display="flex" flexDirection="column" width="29%">
                <nav aria-label="services provided by this website">
                    <List className="facilities-list-right">
                        <ListItemText primary="free shipping" primaryTypographyProps={{ fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em", textTransform: "uppercase" }} />
                        <span style={{ paddingRight: "45px", fontWeight: "300", marginTop: "4px", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                            For county now sister engage had season better had waited. Occasional mrs interested.
                        </span>

                        <ListItemText primary="24/7 SUPPORT" primaryTypographyProps={{ marginTop: "48px", fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em" }} />
                        <span style={{ paddingRight: "45px", fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                            Our team members work for 24/7 to provide you the best experience with most simplicity.
                        </span>

                        <ListItemText primary="MONEY BACK" primaryTypographyProps={{ marginTop: "48px", fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em" }} />
                        <span style={{ paddingRight: "45px", fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                            We provide 100% money back guarantee within 2 days of purchase if defect is there.
                        </span>
                    </List>
                </nav>
            </Box>
        </Box>
    )
};

export default Facilities;
