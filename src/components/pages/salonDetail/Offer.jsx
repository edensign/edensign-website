/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box } from "@mui/material";

const Offer = () => {
    return (
        <Box sx={{ width: "70%", display: "flex", flexDirection: "column", alignItems: "center", margin: "auto", marginBottom: "8%", position: "relative" }}>
            <span className="offer-line"></span>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "uppercase" }}>exclusive offer</span>
                <p className="bigger-text">welcome to eden sign</p>
                <span style={{ fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.1em", padding: "0 130px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida massa at erat iaculis, ut iaculis magna pulvinar. Donec quis odio cursus, consequat erat id.</span>
            </Box>
        </Box>
    )
};

export default Offer;
