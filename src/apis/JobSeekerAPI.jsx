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
    getJobSeekerList: async (page, size, cancel = false) => {
        const { data: response } = await api.request({
            url: `/get-job-seeker-list/${page}/${size}`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getJobSeekerList.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },
    /** Get complete Job Seeker detail of a particular Job Seeker from the database
     */
    getJobSeekerDetail: async (JobSeeker_code, cancel = false) => {
        const { data: response } = await api.request({
            url: `/get-job-seeker-detail`,
            method: "POST",
            data: id,
            signal: cancel ? cancelApiObject[this.getJobSeekerDetail.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    }
};

// defining the cancel API object for JobSeekerAPI
const cancelApiObject = defineCancelApiObject(JobSeekerAPI);
