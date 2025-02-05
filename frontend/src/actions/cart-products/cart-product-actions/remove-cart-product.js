import { ACTION_TYPE } from '../../action-type'

export const removeCartProduct = (id) => ({
	type: ACTION_TYPE.REMOVE_CART_PRODUCT,
	payload: id,
})
