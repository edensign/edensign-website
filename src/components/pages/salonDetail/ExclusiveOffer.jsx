/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box } from "@mui/material";

const ExclusiveOffer = () => {
    return (
        <Box sx={{ width: "70%", display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "auto", marginTop: "10%", position: "relative" }}>
            <span style={{ width: "1px", height: "48px", backgroundColor: "#000000", position: "absolute", top: "-54px" }}></span>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span style={{ fontSize: "12px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "uppercase" }}>exclusive offer</span>
                <p style={{ fontWeight: "400", fontSize: "42px", fontFamily: "Marcellus, sans-serif", lineHeight: "0.05em", letterSpacing: "-0.04em", textTransform: "capitalize", }}>Find The Perfect Salon</p>
            </Box>
        </Box>
    )
};

export default ExclusiveOffer;
