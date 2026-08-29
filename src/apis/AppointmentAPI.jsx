/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";


export const AppointmentAPI = {
    /** Create a new appointment
     */
    createAppointment: async (params, cancel = false) => {
        // Get customer token for authentication
        let token = null;
        try {
            const auth = JSON.parse(localStorage.getItem("customer_auth") || "{}");
            token = auth.token || null;
        } catch {
            token = null;
        }

        const { data: response } = await api.request({
            url: `/create-appointment`,
            method: "POST",
            data: params,
            headers: token ? { "x-access-token": token } : {},
            signal: cancel ? cancelApiObject[this.createAppointment.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Get booked slots for an employee on a specific date
     */
    getBookedSlots: async (params, cancel = false) => {
        const { data: response } = await api.request({
            url: `/get-booked-slots`,
            method: "POST",
            data: params,
            signal: cancel ? cancelApiObject[this.getBookedSlots.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Get the logged-in customer's appointments
     */
    getMyAppointments: async (token, cancel = false) => {
        const { data: response } = await api.request({
            url: `/customer/appointments`,
            method: "GET",
            headers: { "x-access-token": token },
            signal: cancel ? cancelApiObject[this.getMyAppointments.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    }
};

// defining the cancel API object for AppointmentAPI
const cancelApiObject = defineCancelApiObject(AppointmentAPI);
