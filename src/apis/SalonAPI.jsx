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
    getSalonList: async (category = [], gender = null, cancel = false) => {
        let genderParam = gender ? `gender=${gender}` : '';
        let categoryParam = '';
    
        if (category.length > 0) {
            categoryParam = category.map(item => {
                if (item === 'Featured') {
                    return 'is_featured=1';
                } else if (item === 'Franchise') {
                    return 'is_franchise=1';
                }
                // Handle other categories if needed
                // For simplicity, let's assume other categories are included as is
                return item;
            }).join('&');
        }

        if (categoryParam && genderParam) {
            categoryParam = `${categoryParam}&`  
        }
       

        console.log('salon category=>', category);
        console.log('salon categoryParam=>', categoryParam);
        const { data: response } = await api.request({
            url: `/get-salon-list?${categoryParam}${genderParam}`,
            method: "GET",
            // data: {
            //     category : category,
            //     gender: gender
            // },
            signal: cancel ? cancelApiObject[this.getSalonList.name].handleRequestCancellation().signal : undefined,
        });
        console.log(response);
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
