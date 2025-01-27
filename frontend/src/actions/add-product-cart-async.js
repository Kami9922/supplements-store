import { request } from '../utils/request'
import { addCartProduct } from './add-product-cart'
import { setIsLoading } from './set-is-loading'

export const addCartProductAsync = (id) => (dispatch) => {
	request('/carts', 'POST', { id })
		.then((cartProduct) => {
			dispatch(addCartProduct(cartProduct.data))
		})
		.then(() => dispatch(setIsLoading(false, false)))
}
