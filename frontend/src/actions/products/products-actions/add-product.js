import { ACTION_TYPE } from '../../action-type'

export const addProduct = (newProduct) => ({
	type: ACTION_TYPE.ADD_PRODUCT,
	payload: newProduct,
})
