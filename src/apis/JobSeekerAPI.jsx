/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";


export const JobSeekerAPI = {
    /** Get Job Seeker list by joining 2 tables from the database
     */
    getJobSeekerDetail: async (page, size, skill, gender = null, experience = [], cancel = false) => {
        let skillParam = skill.length ? `skills=${skill}` : '';
        let genderParam = gender ? `gender=${gender}` : '';
        const experienceParam = experience.toString() === '0,0' ? '' : `experience=${experience}`;

        if (skillParam && (genderParam || experienceParam)) {
            skillParam = `${skillParam}&`;
        }
        if (genderParam && experienceParam) {
            genderParam = `${genderParam}&`;
        }


        console.log("job-seekerAPI=>", skill, gender, experience, skillParam, genderParam, experienceParam);
        const cancelToken = cancel ? cancelApiObject.getJobSeekerDetail.handleRequestCancellation().token : undefined;
        const { data: response } = await api.request({
            url: `/get-job-seeker-detail/${page}/${size}?${skillParam}${genderParam}${experienceParam}`,
            method: "GET",
            cancelToken: cancelToken,
        });
        return response;
        
    },
};

// defining the cancel API object for JobSeekerAPI
const cancelApiObject = defineCancelApiObject(JobSeekerAPI);
