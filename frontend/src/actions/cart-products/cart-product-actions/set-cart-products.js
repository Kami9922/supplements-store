import { ACTION_TYPE } from '../../action-type'

export const setCartProducts = (cartProducts) => ({
	type: ACTION_TYPE.SET_CART_PRODUCTS,
	payload: cartProducts,
})
