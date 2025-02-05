import { ACTION_TYPE } from '../../action-type'

export const addCartProduct = (newCartProduct) => ({
	type: ACTION_TYPE.ADD_CART_PRODUCT,
	payload: newCartProduct,
})
