import { ACTION_TYPE } from './action-type'

export const editCartProduct = (updatedCartProduct) => ({
	type: ACTION_TYPE.EDIT_CART_PRODUCT,
	payload: updatedCartProduct,
})
