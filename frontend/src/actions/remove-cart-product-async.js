import { request } from '../utils/request'
import { removeCartProduct } from './remove-cart-product'
import { setIsLoading } from './set-is-loading'

export const removeCartProductAsync = (id) => (dispatch) =>
	request(`/carts/${id}`, 'DELETE')
		.then(() => dispatch(removeCartProduct(id)))
		.finally(() => dispatch(setIsLoading(false, false)))
