import { request } from '../../../utils/request'
import { setIsLoading } from '../../other/set-is-loading'
import { setCartProducts } from '../cart-product-actions/set-cart-products'

export const setCartProductsAsync = () => (dispatch) => {
	return request(`/carts`)
		.then(({ data }) => dispatch(setCartProducts(data.cartProducts)))
		.catch((error) => {
			console.error('Ошибка при получении продуктов из корзины:', error)
		})
		.finally(() => dispatch(setIsLoading(false, false)))
}
