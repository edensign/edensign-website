import { useEffect, useState } from "react";

import FilterMenu from "../../common/FilterMenu";
import JobSeekerCards from "./JobSeekerCards";
import PageTop from "./PageTop";
import ServicesStrip from "./ServicesStrip";


const JobSeekers = () => {
    //performing State Upliftment for filter-menu
    const [filterOpen, setFilterOpen] = useState(false);
    const [value, setValue] = useState([2, 6]);   //for experience slider value

    //variables for showing selective filter menu fields
    const [showSkills, showGender, showExperienceRange] = [true, true, true];
    const minDistance = 1;

    //function for calling jobseeker api

    const handleExperienceSliderChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };


    return (
        <div style={{ backgroundColor: "#e5e5e5", color: "#ffffff" }}>
            <PageTop filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
            <FilterMenu showSkills={showSkills} showGender={showGender} showExperienceRange={showExperienceRange}
                value={value} handleChange={handleExperienceSliderChange} max={20} />
            <JobSeekerCards />
            {/* <ServicesStrip /> */}
        </div>
    )
}

export default JobSeekers;
