import { request } from '../utils/request'
import { editCartProduct } from './edit-cart-product'
import { setIsLoading } from './set-is-loading'

export const editCartProductAsync = (id, quantity, operation) => (dispatch) => {
	request(`/carts/${id}`, 'PATCH', { quantity, operation })
		.then((cartProduct) => {
			dispatch(editCartProduct(cartProduct.data))
		})
		.finally(() => dispatch(setIsLoading(false, false)))
}
