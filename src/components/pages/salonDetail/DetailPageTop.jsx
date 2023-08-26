/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Box, Button, Tooltip } from '@mui/material';
import { TuneOutlined } from '@mui/icons-material';
import { TrendingFlat } from '@mui/icons-material';

import SmallCarousel from './SmallCarousel';

const DetailPageTop = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const { images } = useSelector(state => state.salonDetail);

    const handleClick = () => {
        const box = document.getElementsByClassName("box")[0];
        const btn = document.getElementsByClassName("btn")[0];
        const filterBox = document.getElementById("filter-box");
        box.style.right = filterOpen ? "0" : "17%";
        box.style.transform = filterOpen ? "translateX(0)" : "matrix(1, 0, 0, 1, 0, 0)";
        btn.style.width = filterOpen ? "7em" : "4em";
        btn.style.padding = filterOpen ? "10px 50px" : "10px";
        filterBox.style.opacity = filterOpen ? "0" : "1";
        filterBox.style.transform = filterOpen ? "translateX(100%)" : "translateX(0)";

        setFilterOpen(!filterOpen);
    };

    return (
        <Box sx={{
            height: "120vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "1%",
            position: "relative", backgroundPosition: "center", color: "#ffffff"
        }}>
            {images?.map((image, index) => (
                <Box className='big-sliding' key={index} style={{
                    position: "absolute", width: "100%", height: "100%", opacity: "0", transition: "all 1s ease-in", filter: "blur(10px)"
                }}>
                    <img src={`https://edensign.blob.core.windows.net/image-storage/salon/${image}`} style={{ aspectRatio: "1300/715", width: "100%" }} />
                </Box>
            ))}

            < SmallCarousel />

            <Box className="box" onClick={handleClick} sx={{ position: "fixed", top: "40%", right: "0", zIndex: "10", transform: "translateX(0)", transition: "all .5s cubic-bezier(0.77, 0, 0.175, 1)" }}>
                <Tooltip title="Filter">
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0 !important", lineHeight: "42 !important", fontWeight: "500" }}>
                        {/* <span style={{
                            color: "#ffffff", width: "42px", display: "inline-block", lineHeight: "1 !important", textAlign: "center", verticalAlign: "middle", position: "relative"
                        }}>  </span> */}
                        <Button color="error" variant="contained" size="small" className="btn"
                            startIcon={filterOpen ? <TrendingFlat id="flat-icon" /> : <TuneOutlined id="tune-icon" />}
                            sx={{ width: "7em", fontWeight: "500", fontSize: "12px", lineHeight: "1.2", letterSpacing: "0.1em", zIndex: "10", padding: "10px 50px" }}
                        >
                            {filterOpen ? '' : 'Filter'}
                        </Button>
                    </div>
                </Tooltip>
            </Box>
        </Box>
    )
};

export default DetailPageTop;
{/* 
            <Typography sx={{ color: "#ffffff", textTransform: "uppercase", fontWeight: "500", fontSize: "11px", lineHeight: "1.2", letterSpacing: "0.1em", marginTop: "8px" }}>
                <Link style={{ textDecoration: "none", color: "#ffffff", position: "relative", zIndex: "2" }} to="/"> HOME &gt; </Link>
                {location.pathname.slice(1)}
            </Typography> */}