/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box } from '@mui/material';

import AboutBg from "../../assets/eden-signature.png";

const AboutPageTop = () => {

    return (
        <Box sx={{
            height: "70vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
            <img id='imgbg' src={AboutBg} style={{ width: "100%", height: "100%" }} />
        </Box >
    )
};

export default AboutPageTop;
