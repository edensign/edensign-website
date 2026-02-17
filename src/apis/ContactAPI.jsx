/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";


export const ContactAPI = {
    /** Submit contact form
     */
    submitContact: async (params, cancel = false) => {
        const { data: response } = await api.request({
            url: `/create-contact`,
            method: "POST",
            data: params,
            signal: cancel ? cancelApiObject[this.submitContact.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    }
};

// defining the cancel API object for ContactAPI
const cancelApiObject = defineCancelApiObject(ContactAPI);
