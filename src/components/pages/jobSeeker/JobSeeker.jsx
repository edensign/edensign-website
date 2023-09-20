import { useEffect } from "react";

import JobSeekerCards from "./JobSeekerCards";
import PageTop from "./PageTop";


const JobSeekers = () => {


    return (
        <div style={{ backgroundColor: "#A6B7C5", color: "#ffffff" }}>
            <PageTop />
            <JobSeekerCards />
        </div>
    )
}

export default JobSeekers;
