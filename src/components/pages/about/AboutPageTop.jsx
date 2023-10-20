/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useState } from 'react';

import { Box, Button, Tooltip } from '@mui/material';

import AboutBg from "../../assets/eden-signature.png";
import "../about/AboutUs.css"

const AboutPageTop = () => {
    // const location = useLocation();

    return (
        <Box sx={{
            height: "84vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center", position: "relative", color: "#ffffff"
        }}>
            <img id='imgbg' src={AboutBg} style={{ width: "214vh", height: "110vh", position: "absolute",marginBottom:"80px" }} />

            {/* <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
                <p style={{ textTransform: "capitalize", fontSize: "32px", fontWeight: "600", lineHeight: "1", zIndex: "1" }}  >
                    about us  </p>
            </Box> */}

        </Box >
    )
};

{/* <Typography sx={{ color: "#ffffff", textTransform: "uppercase", fontWeight: "500", fontSize: "11px", lineHeight: "1.2", letterSpacing: "0.1em", marginTop: "8px" }}>
<Link style={{ textDecoration: "none", color: "#ffffff", position: "relative", zIndex: "2" }} to="/"> HOME &gt; </Link>
{location.pathname.slice(1)}
</Typography> */}

export default AboutPageTop;
