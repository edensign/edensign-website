import { useEffect, useState } from "react";

import FilterMenu from "../../common/FilterMenu";
import JobSeekerCards from "./JobSeekerCards";
import PageTop from "./PageTop";
import ServicesStrip from "./ServicesStrip";

import API from '../../../apis';

const JobSeekers = () => {
    //performing State Upliftment for filter-menu
    const [filterOpen, setFilterOpen] = useState(false);
    //for experience slider value
    const [value, setValue] = useState([0, 0]);
    //grab all the skills from skill table in db
    const [skills, setSkills] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

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

    const handleFilterChange = (gender, filterSkills) => {
        gender ? setSelectedGender(gender) : '';
        if (filterSkills) {
            console.log(skills.filter(skill => filterSkills.includes(skill.name))
                .map(skill => skill.id));
            setSelectedSkill(skills
                .filter(skill => filterSkills.includes(skill.name))
                .map(skill => skill.id));
        }
    };

    useEffect(() => {
        const getAllSkills = () => {
            API.SkillAPI.getAll(false, 0, 30)
                .then(data => {
                    if (data?.status === 'Success') {
                        setSkills(data.data.rows);
                    }
                })
                .catch(err => {
                    throw err;
                });
        }
        getAllSkills();
    }, []);

    console.log('Main doc skills', skills, selectedSkill)

    return (
        <div style={{ backgroundColor: "#e5e5e5", color: "#ffffff" }}>
            <PageTop filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
            <FilterMenu showSkills={showSkills} showGender={showGender} showExperienceRange={showExperienceRange}
                value={value} handleChange={handleExperienceSliderChange} max={20} onFilter={handleFilterChange} />
            <JobSeekerCards skills={skills} selectedSkill={selectedSkill} selectedGender={selectedGender} selectedExperience={value} />
            {/* <ServicesStrip /> */}
        </div>
    )
}

export default JobSeekers;
