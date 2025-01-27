import { request } from '../utils/request'
import { removeProduct } from './remove-product'
import { setIsLoading } from './set-is-loading'

export const removeProductAsync = (id) => (dispatch) =>
	request(`/products/${id}`, 'DELETE')
		.then(() => dispatch(removeProduct(id)))
		.finally(() => dispatch(setIsLoading(false, false)))
