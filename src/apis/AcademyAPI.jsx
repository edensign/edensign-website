/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const AcademyAPI = {
    /** Get the public list of academy courses from the database
     */
    getPublicList: async (cancel = false) => {
        const { data: response } = await api.request({
            url: `/academy/public-list`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getPublicList.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    }
};

// defining the cancel API object for AcademyAPI
const cancelApiObject = defineCancelApiObject(AcademyAPI);
