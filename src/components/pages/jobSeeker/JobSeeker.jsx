import { useEffect, useState } from "react";

import JobSeekerCards from "./JobSeekerCards";
import PageTop from "./PageTop";
import ServicesStrip from "./ServicesStrip";

import API from '../../../apis';

const JobSeekers = () => {
    //for experience slider value
    const [value, setValue] = useState([0, 0]);
    //grab all the skills from skill table in db
    const [skills, setSkills] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    //variables for showing selective filter menu fields
    const [showSkills, showGender, showExperienceRange] = [true, true, true];
    const minDistance = 1;

    const triggerRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    };

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
            console.log(skills.filter(skill => filterSkills.includes(skill.name)));
            setSelectedSkill(skills
                .filter(skill => filterSkills.includes(skill.name))
                .map(skill => skill.id));
        }
    };

    useEffect(() => {
        const getAllSkills = () => {
            API.SkillAPI.getAll(false, 0, 30)
                .then(data => {
                    if (data?.status === 'Success' && data?.data?.rows) {
                        setSkills(data.data.rows);
                    }
                })
                .catch(err => {
                    console.error("Error fetching skills:", err);
                });
        }
        getAllSkills();
    }, []);


    return (
        <div style={{ backgroundColor: "var(--es-cream)", color: "var(--es-charcoal)", minHeight: '100vh' }}>
            <PageTop onSearch={(q) => setSearchQuery(q)} skills={skills} onProfileAdded={triggerRefresh} />
            <JobSeekerCards skills={skills} selectedSkill={selectedSkill} selectedGender={selectedGender} selectedExperience={value} searchQuery={searchQuery} refreshTrigger={refreshTrigger} />
        </div>
    )
}

export default JobSeekers;
