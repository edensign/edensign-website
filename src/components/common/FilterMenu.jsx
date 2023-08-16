/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { Box, Chip, Checkbox, useMediaQuery, Button } from "@mui/material";
import { TuneOutlined } from '@mui/icons-material';

const FilterMenu = () => {
    const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };
    const isMobile = useMediaQuery("(max-width:480px)");

    const handleClick = (event) => {
        console.log(event.target.parentElement)
        event.target.parentElement.style.color = "#0288d1";
        event.target.parentElement.style.border = "1px solid rgba(2, 136, 209, 0.7)";
    };

    const handleDelete = (event) => {
        console.log(event.target.parentElement)
        event.target.parentElement.style.color = "";
        event.target.parentElement.style.border = "1px solid #bdbdbd";
    };

    return (
        <Box id="filter-box" sx={{ width: "17%", fontFamily: "Inter, sans-serif", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", borderRadius: "20px", opacity: "0", transform: "translateX(100%)", transitionDelay: "300ms", transition: "all .5s cubic-bezier(0.77, 0, 0.175, 1)", position: "fixed", top: "34%", right: "0", zIndex: "10", boxShadow: "0 0 9.8px 0.2px rgba(0, 0, 0, 0.14)" }}>
            <Box sx={{ fontFamily: "inherit", textAlign: "center", margin: "20px 0 30px 0" }}>
                <TuneOutlined sx={{ color: "#d32f2f", float: "left" }} />
                <span style={{ textTransform: "uppercase", fontWeight: "500", fontSize: "15px", lineHeight: "1.2", letterSpacing: "0.05em" }}>  Filters </span>
            </Box>

            <Box display="flex" justifyContent="space-around" marginBottom="30px">
                <Chip sx={{ fontSize: "11px", height: "20px" }} label="Male" variant="outlined" size="small" onClick={handleClick} onDelete={handleDelete} />
                <Chip sx={{ fontSize: "11px", height: "20px" }} label="Female" variant="outlined" size="small" onClick={handleClick} onDelete={handleDelete} />
                <Chip sx={{ fontSize: "11px", height: "20px" }} label="Unisex" variant="outlined" size="small" onClick={handleClick} onDelete={handleDelete} />
            </Box>

            <Box display="flex" justifyContent="space-around" marginBottom="30px">
                <Box>
                    <Checkbox {...checkboxLabel} color="default" size="small" />
                    <span style={{ paddingTop: "8px", fontSize: "11px", fontWeight: "500", lineHeight: "1.2", letterSpacing: "0.05em" }}>Featured</span>
                </Box>
                <Box>
                    <Checkbox {...checkboxLabel} color="default" size="small" />
                    <span style={{ paddingTop: "8px", fontSize: "11px", fontWeight: "500", lineHeight: "1.2", letterSpacing: "0.05em" }}>Franchise</span>
                </Box>
            </Box>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button type="submit" color="info" variant="contained" sx={{ width: "66%", fontFamily: "Inter, sans-serif", fontWeight: "500", fontSize: "12px", lineHeight: "1.2", letterSpacing: "0.05em", marginBottom: "20px" }}>
                    Apply
                </Button>
            </div>
        </Box >
    )
};

export default FilterMenu;
