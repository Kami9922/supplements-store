import { request } from '../utils/request'
import { setCartProducts } from './set-cart-products'
import { setIsLoading } from './set-is-loading'

export const setCartProductsAsync = () => (dispatch) => {
	return request(`/carts`)
		.then(({ data }) => dispatch(setCartProducts(data.cartProducts)))
		.catch((error) => {
			console.error('Ошибка при получении продуктов из корзины:', error)
		})
		.finally(() => dispatch(setIsLoading(false, false)))
}
