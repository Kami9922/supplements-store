import { request } from '../utils/request'
import { setCartProducts } from './set-cart-products'
import { setIsLoading } from './set-is-loading'

export const setCartProductsAsync = () => (dispatch) => {
	request(`/carts`)
		.then(({ data }) => {
			dispatch(setCartProducts(data.cartProducts))
		})
		.finally(() => dispatch(setIsLoading(false, false)))
}
