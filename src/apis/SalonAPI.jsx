/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";


export const SalonAPI = {
    /** Get salons from the database that meets the specified query parameters
     */
    getAll: async (conditionObj = false, page = 0, size = 5, search = false, authInfo, cancel = false) => {
        const queryParam = conditionObj ? `&${conditionObj.key}=${conditionObj.value}` : '';
        const searchParam = search ? `&search=${search}` : '';
        const { data: response } = await api.request({
            url: `/get-salons?page=${page}&size=${size}${queryParam}${searchParam}`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Get salon list by joining 2 tables from the database
     */
    getSalonList: async (gender=null,cancel = false) => {
        let genderParam = gender ? `gender=${gender}` : '';
        const { data: response } = await api.request({
            url: `/get-salon-list${genderParam}`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getSalonList.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Get complete salon detail of a particular salon from the database
     */
    getSalonDetail: async (salon_code, cancel = false) => {
        const { data: response } = await api.request({
            url: `/get-salon-detail`,
            method: "POST",
            data: salon_code,
            signal: cancel ? cancelApiObject[this.getSalonDetail.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    }
};

// defining the cancel API object for SalonAPI
const cancelApiObject = defineCancelApiObject(SalonAPI);
