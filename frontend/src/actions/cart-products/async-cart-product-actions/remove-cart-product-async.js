import { request } from '../../../utils/request'
import { setIsLoading } from '../../other/set-is-loading'
import { removeCartProduct } from '../cart-product-actions/remove-cart-product'

export const removeCartProductAsync = (id) => (dispatch) =>
	request(`/carts/${id}`, 'DELETE')
		.then(() => dispatch(removeCartProduct(id)))
		.catch((error) => {
			console.error('Ошибка при удалении продукта в корзине:', error)
		})
		.finally(() => dispatch(setIsLoading(false, false)))
