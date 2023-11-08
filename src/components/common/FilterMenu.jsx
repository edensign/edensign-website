/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";

import { Box, Chip, Checkbox, Divider, useMediaQuery, Button, Slider, FormControlLabel } from "@mui/material";

import { setFilterOpen } from "../../redux/actions/FilterAction";
// import { TuneOutlined } from '@mui/icons-material';

const FilterMenu = ({
    max,
    value,
    handleChange,
    onFilter,
    showSkills,
    showCategory,
    showBrand,
    showGender,
    showUnisex,
    showPriceRange,
    showExperienceRange }) => {

    const [selectedSkill, setSelectedSkill] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    const filterOpen = useSelector(state => state.filterOpen);
    const dispatch = useDispatch();
    const location = useLocation();
    const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };
    const isMobile = useMediaQuery("(max-width:480px)");
    // const box = document.getElementsByClassName("filter-btn-box")[0];
    // const filterBox = document.getElementById("filter-box");


    const handleSkillClick = (event, value) => {
        console.log(value)
        if (value === true) {
            console.log(event.target.parentElement.nextSibling.innerText)
            setSelectedSkill([
                ...selectedSkill,
                event.target.parentElement.nextSibling.innerText
            ]);
        } else {
            console.log(selectedSkill.filter(skill => skill !== event.target.parentElement.nextSibling.innerText))
            setSelectedSkill(selectedSkill.filter(skill => skill !== event.target.parentElement.nextSibling.innerText));
        }
    };

    const handleGenderClick = (event) => {
        setSelectedGender(event.target.innerText.toLowerCase())
        event.target.parentElement.style.color = "#0288d1";
        event.target.parentElement.style.border = "1px solid rgba(2, 136, 209, 0.7)";
    };

    const handleGenderDelete = (event) => {
        setSelectedGender('');
        event.target.parentElement.style.color = "";
        event.target.parentElement.style.border = "1px solid #bdbdbd";
    };

    const handleFilterChange = () => {
        const box = document.getElementsByClassName("filter-btn-box")[0];
        const btn = document.getElementsByClassName("filter-open-btn")[0];
        const filterBox = document.getElementById("filter-box");
        const arrowicon = document.getElementById("arrowicon");

        onFilter(selectedGender, selectedSkill);
        console.log('filtermenu utton', filterOpen)
        dispatch(setFilterOpen(!filterOpen.filterOpen))
        window.scrollTo(0, 270);

        box.style.right = filterOpen.filterOpen ? "0" : "27%";
        box.style.transform = filterOpen.filterOpen ? "translateX(0)" : "matrix(1, 0, 0, 1, 0, 0)";
        btn.style.width = filterOpen.filterOpen ? "7em" : "4em";
        btn.style.padding = filterOpen.filterOpen ? "10px 50px" : "9px 0px 9px 4px";
        filterBox.style.opacity = filterOpen.filterOpen ? "0" : "1";
        filterBox.style.transform = filterOpen.filterOpen ? "translateX(100%)" : "translateX(0)";
        arrowicon.style.transform = filterOpen.filterOpen ? "" : "rotate(180deg)";
    };
    console.log("Gender=>", selectedGender)
    


    return (
        <Box id="filter-box" sx={{
            width: location.pathname === '/salons' ? '21%' : "27%", fontFamily: "Inter, sans-serif", backgroundColor: "#ffffff", display: "flex",
            flexDirection: "column", borderRadius: "14px", opacity: "0", transform: "translateX(100%)",
            transitionDelay: "300ms", transition: "all .5s cubic-bezier(0.77, 0, 0.175, 1)", position: "fixed",
            top: location.pathname === '/salons' ? '32%' : "21%", right: "0", zIndex: "10", boxShadow: "0 0 9.8px 0.2px rgba(0, 0, 0, 0.14)", color: "#000000"
        }}>

            {showSkills && <div>
                <p style={{
                    fontWeight: "700", fontSize: "16px", letterSpacing: "0.1em", textTransform: "capitalize",
                    padding: "0 16px", marginBottom: "8px"
                }}> Skills </p>
                <Divider sx={{ width: "88%", margin: "auto" }} />
                <Box width="100%" display="grid" gap="4px" gridTemplateColumns="repeat(2, minmax(0, 1fr))" justifyItems="start" padding="4px 10px 2px 10px">
                    <FormControlLabel label="Hair stylist" sx={{
                        margin: "0",
                        '& .MuiTypography-root': { fontSize: "12px", fontWeight: "550", letterSpacing: "0.05em", textTransform: "capitalize" }
                    }}
                        control={
                            <Checkbox {...checkboxLabel} color="default" size="small" onChange={(event, value) => handleSkillClick(event, value)} />
                        } />
                    <FormControlLabel label="Assistant hair stylist" sx={{
                        margin: "0",
                        '& .MuiTypography-root': { fontSize: "12px", fontWeight: "550", letterSpacing: "0.05em", textTransform: "capitalize" }
                    }}
                        control={
                            <Checkbox {...checkboxLabel} color="default" size="small" onChange={(event, value) => handleSkillClick(event, value)} />
                        } />
                    <FormControlLabel label="Makeup artist" sx={{
                        margin: "0",
                        '& .MuiTypography-root': { fontSize: "12px", fontWeight: "550", letterSpacing: "0.05em", textTransform: "capitalize" }
                    }}
                        control={
                            <Checkbox {...checkboxLabel} color="default" size="small" onChange={(event, value) => handleSkillClick(event, value)} />
                        } />
                    <FormControlLabel label="Bridal Makeup artist" sx={{
                        margin: "0",
                        '& .MuiTypography-root': { fontSize: "12px", fontWeight: "550", letterSpacing: "0.05em", textTransform: "capitalize" }
                    }}
                        control={
                            <Checkbox {...checkboxLabel} color="default" size="small" onChange={(event, value) => handleSkillClick(event, value)} />
                        } />
                    <FormControlLabel label="eyebrow specialist" sx={{
                        margin: "0",
                        '& .MuiTypography-root': { fontSize: "12px", fontWeight: "550", letterSpacing: "0.05em", textTransform: "capitalize" }
                    }}
                        control={
                            <Checkbox {...checkboxLabel} color="default" size="small" onChange={(event, value) => handleSkillClick(event, value)} />
                        } />
                    <FormControlLabel label="manicure specialist" sx={{
                        margin: "0",
                        '& .MuiTypography-root': { fontSize: "12px", fontWeight: "550", letterSpacing: "0.05em", textTransform: "capitalize" }
                    }}
                        control={
                            <Checkbox {...checkboxLabel} color="default" size="small" onChange={(event, value) => handleSkillClick(event, value)} />
                        } />
                    <FormControlLabel label="Nail technician" sx={{
                        margin: "0",
                        '& .MuiTypography-root': { fontSize: "12px", fontWeight: "550", letterSpacing: "0.05em", textTransform: "capitalize" }
                    }}
                        control={
                            <Checkbox {...checkboxLabel} color="default" size="small" onChange={(event, value) => handleSkillClick(event, value)} />
                        } />
                    <FormControlLabel label="Receptionist" sx={{
                        margin: "0",
                        '& .MuiTypography-root': { fontSize: "12px", fontWeight: "550", letterSpacing: "0.05em", textTransform: "capitalize" }
                    }}
                        control={
                            <Checkbox {...checkboxLabel} color="default" size="small" onChange={(event, value) => handleSkillClick(event, value)} />
                        } />
                </Box>
            </div>}

            {showCategory && <div>
                <p style={{
                    fontWeight: "700", fontSize: "16px", letterSpacing: "0.1em", textTransform: "capitalize",
                    padding: "0 16px", marginBottom: "8px"
                }}> Category </p>
                <Divider sx={{ width: "88%", margin: "auto" }} />
                <Box width="75%" display="flex" justifyContent="space-between" padding="4px 10px 2px 10px">
                    <Box>
                        <Checkbox {...checkboxLabel} color="default" size="small" />
                        <span style={{
                            paddingTop: "8px", fontSize: "12px", fontWeight: "500", lineHeight: "1.2",
                            letterSpacing: "0.05em", textTransform: "capitalize"
                        }}>Featured</span>
                    </Box>
                    <Box>
                        <Checkbox {...checkboxLabel} color="default" size="small" />
                        <span style={{
                            paddingTop: "8px", fontSize: "12px", fontWeight: "500", lineHeight: "1.2",
                            letterSpacing: "0.05em", textTransform: "capitalize"
                        }}>Franchise</span>
                    </Box>
                </Box>
            </div>}

            {showBrand && <div>
                <p style={{
                    fontWeight: "700", fontSize: "16px", letterSpacing: "0.1em", textTransform: "capitalize",
                    padding: "0 16px", margin: "8px"
                }}> Brand </p>
                <Divider sx={{ width: "88%", margin: "auto" }} />
                <Box width="100%" display="grid" gap="4px" gridTemplateColumns="repeat(2, minmax(0, 1fr))" justifyItems="start" padding="4px 10px 2px 10px">
                    <Box>
                        <Checkbox {...checkboxLabel} color="default" size="small" />
                        <span style={{
                            paddingTop: "8px", fontSize: "12px", fontWeight: "500", lineHeight: "1.2",
                            letterSpacing: "0.05em", textTransform: "capitalize"
                        }}>Aerin</span>
                    </Box>
                    <Box>
                        <Checkbox {...checkboxLabel} color="default" size="small" />
                        <span style={{
                            paddingTop: "8px", fontSize: "12px", fontWeight: "500", lineHeight: "1.2",
                            letterSpacing: "0.05em", textTransform: "capitalize"
                        }}>Fable & Mane</span>
                    </Box>
                    <Box>
                        <Checkbox {...checkboxLabel} color="default" size="small" />
                        <span style={{
                            paddingTop: "8px", fontSize: "12px", fontWeight: "500", lineHeight: "1.2",
                            letterSpacing: "0.05em", textTransform: "capitalize"
                        }}>Loreal</span>
                    </Box>
                    <Box>
                        <Checkbox {...checkboxLabel} color="default" size="small" />
                        <span style={{
                            paddingTop: "8px", fontSize: "12px", fontWeight: "500", lineHeight: "1.2",
                            letterSpacing: "0.05em", textTransform: "capitalize"
                        }}>Mac</span>
                    </Box>
                    <Box>
                        <Checkbox {...checkboxLabel} color="default" size="small" />
                        <span style={{
                            paddingTop: "8px", fontSize: "12px", fontWeight: "500", lineHeight: "1.2",
                            letterSpacing: "0.05em", textTransform: "capitalize"
                        }}>Revlon</span>
                    </Box>
                    <Box>
                        <Checkbox {...checkboxLabel} color="default" size="small" />
                        <span style={{
                            paddingTop: "8px", fontSize: "12px", fontWeight: "500", lineHeight: "1.2",
                            letterSpacing: "0.05em", textTransform: "capitalize"
                        }}>Schwarzkopf</span>
                    </Box>
                    <Box gridColumn="span 2">
                        <Checkbox {...checkboxLabel} color="default" size="small" />
                        <span style={{
                            paddingTop: "8px", fontSize: "12px", fontWeight: "500", lineHeight: "1.2",
                            letterSpacing: "0.05em", textTransform: "capitalize"
                        }}>Eden Signature</span>
                    </Box>
                </Box>
            </div>}

            {showGender && <div style={{ marginBottom: location.pathname === '/salons' ? "15px" : null }}>
                <p style={{
                    fontWeight: "700", fontSize: "16px", letterSpacing: "0.1em", textTransform: "capitalize",
                    padding: "0 16px", margin: "8px"
                }}> Gender </p>
                <Divider sx={{ width: "88%", margin: "auto" }} />
                <Box width={location.pathname === '/job-seeker' ? "64%" : "auto"} display="flex" justifyContent="space-around" padding="12px 10px">
                    <Chip sx={{ fontSize: "12px", height: "20px", fontWeight: "300" }} label="Male"
                        variant="outlined" size="small" onClick={handleGenderClick} onDelete={handleGenderDelete} />
                    <Chip sx={{ fontSize: "12px", height: "20px", fontWeight: "300" }} label="Female"
                        variant="outlined" size="small" onClick={(event) => handleGenderClick(event, 'gender')} onDelete={handleGenderDelete} />
                    {showUnisex && <div style={{ display: "inherit" }}>
                        <Chip sx={{ fontSize: "12px", height: "20px", fontWeight: "300" }} label="Unisex"
                            variant="outlined" size="small" onClick={(event) => handleGenderClick(event, 'gender')} onDelete={handleGenderDelete} />
                    </div>}
                </Box>
            </div>}

            {showPriceRange && <div>
                <p style={{
                    fontWeight: "700", fontSize: "16px", letterSpacing: "0.1em", textTransform: "capitalize",
                    padding: "0 16px", margin: "8px"
                }}> Price Range </p>
                <Divider sx={{ width: "88%", margin: "auto" }} />
                <Box sx={{ width: 240, margin: "auto", marginBottom: "10px" }}>
                    <Slider
                        color="secondary"
                        size="small"
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaLabel={() => 'Price range'}
                        getAriaValueText={valueText}
                    />
                </Box>
            </div>}

            {showExperienceRange && <div>
                <p style={{
                    fontWeight: "700", fontSize: "16px", letterSpacing: "0.1em", textTransform: "capitalize",
                    padding: "0 16px", margin: "8px"
                }}> Experience Range </p>
                <Divider sx={{ width: "88%", margin: "auto" }} />
                <Box sx={{ width: 300, margin: "auto", marginBottom: "10px" }}>
                    <Slider
                        max={max}
                        disableSwap
                        color="secondary"
                        size="small"
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaLabel={() => 'Experience range'}
                        sx={{ width: location.pathname === '/job-seeker' ? "52%" : "auto" }}
                    />
                    <p style={{
                        fontSize: "12px", fontWeight: "500", lineHeight: "1.2", letterSpacing: "0.05em",
                        textTransform: "capitalize", margin: "4px 0px 18px 0px"
                    }}>{`experience: ${value[0]} - ${value[1]} years`}</p>
                </Box>
            </div>}

            <div style={{ display: "flex", alignItems: "center", padding: "2px 26px" }}>
                <Button type="submit" color="info" variant="contained" onClick={handleFilterChange} sx={{
                    fontFamily: "Inter, sans-serif", fontWeight: "500", fontSize: "12px",
                    letterSpacing: "0.05em", marginBottom: "20px", padding: "4px 19px"
                }}>
                    Apply
                </Button>
            </div>
        </Box >
    )
};

export default FilterMenu;
