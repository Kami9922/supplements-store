import { request } from '../utils/request'
import { removeProduct } from './remove-product'

export const removeProductAsync = (id) => (dispatch) =>
	request(`/products/${id}`, 'DELETE').then(() => dispatch(removeProduct(id)))
