/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { ActionTypes } from '../constants/action-types';

const loadCart = () => {
  try {
    const serialized = localStorage.getItem('es_cart');
    if (serialized === null) {
      return { items: [], totalQty: 0, totalPrice: 0 };
    }
    return JSON.parse(serialized);
  } catch (e) {
    console.error('Could not load cart', e);
    return { items: [], totalQty: 0, totalPrice: 0 };
  }
};

const initialState = loadCart();

function recalc(items) {
  const state = {
    items,
    totalQty: items.reduce((sum, i) => sum + i.qty, 0),
    totalPrice: items.reduce((sum, i) => sum + i.qty * Number(i.discounted_price || i.price || 0), 0),
  };
  try {
    localStorage.setItem('es_cart', JSON.stringify(state));
  } catch (e) {
    console.error('Could not save cart', e);
  }
  return state;
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CART_ADD: {
      const existing = state.items.findIndex(i => i.id === action.payload.id);
      let items;
      if (existing >= 0) {
        items = state.items.map((item, idx) =>
          idx === existing ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        items = [...state.items, { ...action.payload, qty: 1 }];
      }
      return { ...state, items, ...recalc(items) };
    }

    case ActionTypes.CART_REMOVE: {
      const items = state.items.filter(i => i.id !== action.payload);
      return { ...state, items, ...recalc(items) };
    }

    case ActionTypes.CART_UPDATE_QTY: {
      const items = state.items
        .map(i => i.id === action.payload.productId ? { ...i, qty: action.payload.qty } : i)
        .filter(i => i.qty > 0);
      return { ...state, items, ...recalc(items) };
    }

    case ActionTypes.CART_CLEAR:
      return { ...state, items: [], ...recalc([]) };

    default:
      return state;
  }
};
