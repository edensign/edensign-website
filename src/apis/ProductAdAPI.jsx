/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const ProductAdAPI = {
    getSponsored: async (cancel = false) => {
        const { data: response } = await api.request({
            url: `/products/sponsored`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getSponsored.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },
    trackClick: async (id, cancel = false) => {
        const { data: response } = await api.request({
            url: `/product-ads/track-click/${id}`,
            method: "POST",
            signal: cancel ? cancelApiObject[this.trackClick.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    }
};

const cancelApiObject = defineCancelApiObject(ProductAdAPI);
