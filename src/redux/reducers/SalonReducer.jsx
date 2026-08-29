/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { ActionTypes } from "../constants/action-types";

const initialState = {
    listData: [],
    loading: true
};

const detailState = {
    salon: {},
    images: []
};

export const setSalonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_SALONS:
            return {
                ...state,
                listData: action.payload.listData,
                loading: action.payload.loading
            };
        default:
            return state;
    };
};

export const setSalonDetailReducer = (state = detailState, action) => {
    switch (action.type) {
        case ActionTypes.SET_SALON_DETAIL:
            return {
                ...state,
                salon: action.payload.salon,
                images: action.payload.images
            };
        default:
            return state;
    };
};
