/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const DigitalOfferAPI = {
    /** Get all active digital offers (public) */
    getPublicOffers: async (salonId = null, cancel = false) => {
        let url = `/digital-offers/get-all?isActive=true`;
        if (salonId) url += `&salonId=${salonId}`;
        const { data: response } = await api.request({
            url,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getPublicOffers.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Claim a digital offer (customer) */
    claimOffer: async (payload, token, cancel = false) => {
        const { data: response } = await api.request({
            url: `/digital-offers/claim`,
            method: "POST",
            headers: { "x-access-token": token },
            data: payload,
            signal: cancel ? cancelApiObject[this.claimOffer.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Get the logged-in customer's claimed offer cards */
    getMyCards: async (token, cancel = false) => {
        const { data: response } = await api.request({
            url: `/digital-offers/my-cards`,
            method: "GET",
            headers: { "x-access-token": token },
            signal: cancel ? cancelApiObject[this.getMyCards.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },
};

// defining the cancel API object for DigitalOfferAPI
const cancelApiObject = defineCancelApiObject(DigitalOfferAPI);
