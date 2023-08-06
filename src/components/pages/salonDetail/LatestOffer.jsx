/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box } from "@mui/material";

const LatestOffer = () => {
    return (
        <Box sx={{ width: "70%", display: "flex", flexDirection: "column", alignItems: "center", margin: "auto", marginBottom: "2%", position: "relative" }}>
            <span className="offer-line"></span>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "uppercase" }}>browse through</span>
                <p style={{ fontWeight: "400", fontSize: "52px", fontFamily: "Marcellus, sans-serif", lineHeight: "1.2em", letterSpacing: "-0.04em", textTransform: "capitalize", margin: "1% auto" }}>our latest offers</p>
            </Box>
        </Box>
    )
};

export default LatestOffer;
