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
    getJobSeekerDetail: async (page, size, skill, gender = null, experience = [], search = '', cancel = false) => {
        const params = [];
        if (skill && skill.length) params.push(`skills=${skill}`);
        if (gender) params.push(`gender=${gender}`);
        if (experience && experience.toString() !== '0,0') params.push(`experience=${experience}`);
        if (search) params.push(`search=${encodeURIComponent(search)}`);

        const queryString = params.join('&');
        const url = `/get-job-seeker-list/${page}/${size}${queryString ? '?' + queryString : ''}`;

        console.log("job-seekerAPI=> url:", url);
        const cancelToken = cancel ? cancelApiObject.getJobSeekerDetail.handleRequestCancellation().token : undefined;
        const { data: response } = await api.request({
            url: url,
            method: "GET",
            cancelToken: cancelToken,
        });
        return response;
    },

    /** Create a new Job Seeker profile
     */
    createJobSeeker: async (jobSeeker) => {
        let token = null;
        try {
            const auth = JSON.parse(localStorage.getItem("customer_auth") || "{}");
            token = auth.token || null;
        } catch (e) {
            console.error("Failed to parse customer token:", e);
        }

        const headers = {};
        if (token) {
            headers["x-access-token"] = token;
        }

        const { data: response } = await api.request({
            url: `/create-job-seeker`,
            method: "POST",
            data: jobSeeker,
            headers
        });
        return response;
    },
};

// defining the cancel API object for JobSeekerAPI
const cancelApiObject = defineCancelApiObject(JobSeekerAPI);
