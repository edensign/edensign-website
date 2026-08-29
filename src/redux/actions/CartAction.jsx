/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { ActionTypes } from '../constants/action-types';

export const addToCart = (product) => ({
  type: ActionTypes.CART_ADD,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: ActionTypes.CART_REMOVE,
  payload: productId,
});

export const updateCartQty = (productId, qty) => ({
  type: ActionTypes.CART_UPDATE_QTY,
  payload: { productId, qty },
});

export const clearCart = () => ({
  type: ActionTypes.CART_CLEAR,
});
