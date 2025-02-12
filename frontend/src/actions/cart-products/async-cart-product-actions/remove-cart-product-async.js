import { request } from '../../../utils/request'
import { setErrorMessage } from '../../other/set-error-message'
import { setIsLoading } from '../../other/set-is-loading'
import { removeCartProduct } from '../cart-product-actions/remove-cart-product'

export const removeCartProductAsync = (id) => (dispatch) =>
	request(`/carts/${id}`, 'DELETE')
		.then(() => dispatch(removeCartProduct(id)))
		.catch((error) => {
			console.error(error.message)
			dispatch(setErrorMessage('Ошибка при удалении продукта'))
		})
		.finally(() => dispatch(setIsLoading(false, false)))
