/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import MailIcon from '@mui/icons-material/Mail';

import locationImg from "../../assets/our_location.png"
// style={{ position: "absolute", left: "0", top: "0", height: "100%", width: "100%", zIndex: "-1" }}>
const TheLocations = () => {
    return (
        <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ width: "93%", height: "110vh", position: "relative", paddingLeft: "5%", margin: "2% 0 8% 0", fontFamily: "Inter, sans-serif" }}>
            <Box sx={{ width: "35%", display: "flex", flexDirection: "column", alignItems: "flex-start", position: "relative" }}>
                <span className="offer-line"></span>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "12px", fontWeight: "500", lineHeight: "32px", letterSpacing: "2.1px", textTransform: "uppercase", marginTop: "20px" }}>Global salon chain</span>
                    <p style={{ fontWeight: "400", fontSize: "42px", fontFamily: "Marcellus, sans-serif", lineHeight: "0.05em", letterSpacing: "-0.04em", textTransform: "capitalize" }}>our locations</p>
                    <p style={{ fontWeight: "300", fontSize: "14px", lineHeight: "28px", letterSpacing: "0.05em" }}> Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris</p>
                    <span>
                        <PlaceIcon sx={{ fontSize: "32px", margin: "50px 0 10px 0" }} />
                        <p style={{ fontSize: "14px", letterSpacing: "0.05em", lineHeight: "28px", fontWeight: "400" }}> 25 West 21th Street, Miami Fl, USA </p>
                    </span>
                    <span>
                        <MailIcon sx={{ fontSize: "32px", margin: "20px 0 10px 0" }} />
                        <p style={{ fontSize: "14px", letterSpacing: "0.05em", lineHeight: "28px", fontWeight: "400" }}>info@edensign.com </p>
                    </span>
                </Box>
            </Box>

            <Box sx={{ maxWidth: "40%", width: "39%", height: "70vh", position: "relative", display: "flex", flexWrap: "wrap" }}>
                <Box sx={{ position: "absolute", left: "0", top: "20px", zIndex: "1", height: "100%", width: "100%", borderRadius: "50%", boxShadow: "4px 4px 6px #800080, -4px -4px 6px #800080", overflow: "hidden", cursor: `url(https://maps.gstatic.com/mapfiles/openhand_8_8.cur), default`, touchAction: "pan-x pan-y" }}>
                    <iframe aria-hidden="true" allowFullScreen="" frameBorder="0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" width="470" height="440"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.079569210787!2d79.4141265744352!3d28.38666459520531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a007b41b1eec35%3A0xc44ff0449ba21640!2sEden%20Signature!5e0!3m2!1sen!2sin!4v1690528770409!5m2!1sen!2sin">
                    </iframe>

                </Box>

            </Box>

            <Box display="flex" flexDirection="column" width="18%" marginTop="-12%">
                <img src={locationImg} alt="brand" style={{ height: "auto", width: "246px", maxWidth: "100%", border: "none", borderRadius: "0", boxShadow: "none", aspectRatio: "240/641" }} />
            </Box>

        </Box>
    )
};

export default TheLocations;
