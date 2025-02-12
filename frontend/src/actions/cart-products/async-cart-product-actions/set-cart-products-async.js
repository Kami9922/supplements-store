import { request } from '../../../utils/request'
import { setErrorMessage } from '../../other/set-error-message'
import { setIsLoading } from '../../other/set-is-loading'
import { setCartProducts } from '../cart-product-actions/set-cart-products'

export const setCartProductsAsync = () => (dispatch) => {
	return request(`/carts`)
		.then(({ data }) => dispatch(setCartProducts(data.cartProducts)))
		.catch((error) => {
			console.error(error.message)
			dispatch(setErrorMessage('Ошибка при получении продуктов из корзины'))
		})
		.finally(() => dispatch(setIsLoading(false, false)))
}
