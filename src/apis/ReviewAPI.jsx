/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";


export const ReviewAPI = {
    /** Submit a review for a salon
     */
    submitReview: async (params, cancel = false) => {
        const { data: response } = await api.request({
            url: `/create-review`,
            method: "POST",
            data: params,
            signal: cancel ? cancelApiObject[this.submitReview.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Get all reviews for a salon
     */
    getReviewsBySalon: async (salonId, cancel = false) => {
        const { data: response } = await api.request({
            url: `/get-reviews/${salonId}`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getReviewsBySalon.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Submit a website experience review
     */
    submitWebsiteReview: async (params, cancel = false) => {
        const { data: response } = await api.request({
            url: `/create-website-review`,
            method: "POST",
            data: params,
            signal: cancel ? cancelApiObject[this.submitWebsiteReview.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Get all website experience reviews
     */
    getWebsiteReviews: async (cancel = false) => {
        const { data: response } = await api.request({
            url: `/get-website-reviews`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getWebsiteReviews.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    }
};

// defining the cancel API object for ReviewAPI
const cancelApiObject = defineCancelApiObject(ReviewAPI);
