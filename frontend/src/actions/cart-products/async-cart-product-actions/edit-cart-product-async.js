import { request } from '../../../utils/request'
import { setErrorMessage } from '../../other/set-error-message'
import { setIsLoading } from '../../other/set-is-loading'
import { editCartProduct } from '../cart-product-actions/edit-cart-product'

export const editCartProductAsync = (id, quantity, operation) => (dispatch) => {
	request(`/carts/${id}`, 'PATCH', { quantity, operation })
		.then((cartProduct) => {
			dispatch(editCartProduct(cartProduct.data))
		})
		.catch((error) => {
			console.error(error.message)
			dispatch(setErrorMessage('Ошибка при редактировании продукта'))
		})
		.finally(() => dispatch(setIsLoading(false, false, false)))
}
