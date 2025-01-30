import { ACTION_TYPE } from './action-type'

export const editProduct = (updatedProduct) => ({
	type: ACTION_TYPE.EDIT_PRODUCT,
	payload: updatedProduct,
})
