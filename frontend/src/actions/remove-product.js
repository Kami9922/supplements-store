import { ACTION_TYPE } from './action-type'

export const removeProduct = (productId) => ({
	type: ACTION_TYPE.REMOVE_PRODUCT,
	payload: productId,
})
