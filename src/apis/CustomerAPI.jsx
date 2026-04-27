/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

const getToken = () => {
    try {
        const auth = JSON.parse(localStorage.getItem("customer_auth") || "{}");
        return auth.token || null;
    } catch {
        return null;
    }
};

export const CustomerAPI = {
    /** Register a new customer
     */
    register: async (params, cancel = false) => {
        const { data: response } = await api.request({
            url: `/customer/register`,
            method: "POST",
            data: params,
            signal: cancel ? cancelApiObject[this.register.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Login customer
     */
    login: async (params, cancel = false) => {
        const { data: response } = await api.request({
            url: `/customer/login`,
            method: "POST",
            data: params,
            signal: cancel ? cancelApiObject[this.login.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Get customer profile
     */
    getProfile: async (cancel = false) => {
        const token = getToken();
        if (!token) {
            return { status: "Error", data: "Not authenticated" };
        }
        const { data: response } = await api.request({
            url: `/customer/profile`,
            method: "GET",
            headers: {
                "x-access-token": token
            },
            signal: cancel ? cancelApiObject[this.getProfile.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Check if customer is logged in
     */
    isLoggedIn: () => {
        return !!getToken();
    },

    /** Get current token
     */
    getToken: () => {
        return getToken();
    },

    /** Get stored customer info
     */
    getCustomer: () => {
        try {
            const auth = JSON.parse(localStorage.getItem("customer_auth") || "{}");
            return auth.customer || null;
        } catch {
            return null;
        }
    },

    /** Save auth data to localStorage
     */
    saveAuth: (token, customer) => {
        localStorage.setItem("customer_auth", JSON.stringify({ token, customer }));
    },

    /** Clear auth data
     */
    logout: () => {
        localStorage.removeItem("customer_auth");
    }
};

// defining the cancel API object for CustomerAPI
const cancelApiObject = defineCancelApiObject(CustomerAPI);
