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
        <Box id="filter-box" sx={{ fontFamily: "Inter, sans-serif", height: "34vh", width: "24vw", opacity: "0", transform: "translateX(100%)", transition: "all 1s ease", position: "fixed", top: "26%", right: "0" }}>
            <Box sx={{ backgroundColor: "#f3f3f3" }}>
                <p style={{ textAlign: "center", textTransform: "uppercase", fontWeight: "500", fontSize: "16px", lineHeight: "1.2", letterSpacing: "0.05em" }}>
                    <TuneOutlined sx={{ color: "#d32f2f" }} />  Filters
                </p>

                <Box display="flex" justifyContent="space-around">
                    <Chip className="chip" label="Male" variant="outlined" size="small" onClick={handleClick} onDelete={handleDelete} />
                    <Chip className="chip" label="Female" variant="outlined" size="small" onClick={handleClick} onDelete={handleDelete} />
                    <Chip className="chip" label="Unisex" variant="outlined" size="small" onClick={handleClick} onDelete={handleDelete} />
                </Box>

                <Box display="flex" justifyContent="space-around">
                    <Box>
                        <Checkbox {...checkboxLabel} color="default" size="small" />
                        <span style={{ paddingTop: "8px", fontSize: "10px", fontWeight: "500", lineHeight: "1.2", letterSpacing: "0.05em" }}>Featured</span>
                    </Box>
                    <Box>
                        <Checkbox {...checkboxLabel} color="default" size="small" />
                        <span style={{ paddingTop: "8px", fontSize: "10px", fontWeight: "500", lineHeight: "1.2", letterSpacing: "0.05em" }}>Franchise</span>
                    </Box>
                </Box>
                <Button type="submit" color="warning" variant="contained" size="small" fullWidth sx={{ borderRadius: "0", fontFamily: "Inter, sans-serif", fontWeight: "500", fontSize: "10px", lineHeight: "1.2", letterSpacing: "0.05em" }}>
                    Apply
                </Button>
            </Box>
        </Box>
    )
};

export default FilterMenu;
