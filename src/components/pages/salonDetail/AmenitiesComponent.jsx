/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React from 'react';
import { useSelector } from 'react-redux';

import { Box, List, ListItemText } from "@mui/material";

import salonImg from "../../assets/salon-detail.png";

const AmenitiesComponent = () => {

    const { salon } = useSelector(state => state.salonDetail);
    console.log("Amenities Selector=>", salon?.amenities);


    return (
        <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ width: "100%", position: "relative", marginBottom: "11%", fontFamily: "Inter, sans-serif" }}>
            <Box display="flex" flexDirection="column" textAlign="right" width="29%">
                <nav aria-label="services provided by this website">
                    <List className="facilities-list-left">

                        {salon?.amenities?.slice(0, 3).map((amenity, index) => (
                            <React.Fragment key={index}>
                                <ListItemText primary={amenity.name} primaryTypographyProps={{ fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em", textTransform: "uppercase" }} />
                                <span style={{ paddingLeft: "80px", marginTop: "4px", marginBottom: "25px", fontWeight: "300", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                                    {amenity.description}
                                </span>
                            </React.Fragment>
                        ))}

                    </List>
                </nav>
            </Box>

            <Box className="facilities-img-box">
                <img src={salonImg} alt="brand" style={{ height: "auto", width: "276px", maxWidth: "100%", border: "none", borderRadius: "0", boxShadow: "none", aspectRatio: "auto 276/641" }} />
            </Box>

            <Box display="flex" flexDirection="column" width="29%">
                <nav aria-label="services provided by this website">
                    <List className="facilities-list-right">

                        {salon?.amenities?.slice(3, 6).map((amenity, index) => (
                            <React.Fragment key={index}>
                                <ListItemText primary={amenity.name} primaryTypographyProps={{ fontWeight: "400", fontSize: "21px", lineHeight: "28px", letterSpacing: "0.14em", textTransform: "uppercase" }} />
                                <span style={{ paddingRight: "45px", fontWeight: "300", marginTop: "4px", marginBottom: "25px", fontSize: "13px", lineHeight: "22px", letterSpacing: "0.015em" }}>
                                    {amenity.description}
                                </span>
                            </React.Fragment>
                        ))}

                    </List>
                </nav>
            </Box>
        </Box>
    )
};

export default AmenitiesComponent;
