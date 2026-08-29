/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";


export const SalonEmployeeAPI = {
    /** Get salon employee of a particular salon from the database of a service
     */
    getSalonEmployee: async (params, cancel = false) => {
        const { data: response } = await api.request({
            url: `/get-salon-employee`,
            method: "POST",
            data: params,
            signal: cancel ? cancelApiObject[this.getSalonEmployee.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },
    getBookedSlots: async (params, cancel = false) => {
        const { data: response } = await api.request({
            url: `/get-booked-slots`,
            method: "POST",
            data: params,
            signal: cancel ? cancelApiObject[this.getBookedSlots.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    }
};

// defining the cancel API object for SalonEmployeeAPI
const cancelApiObject = defineCancelApiObject(SalonEmployeeAPI);
