import { request } from '../../../utils/request'
import { setIsLoading } from '../../other/set-is-loading'
import { editCartProduct } from '../cart-product-actions/edit-cart-product'

export const editCartProductAsync = (id, quantity, operation) => (dispatch) => {
	request(`/carts/${id}`, 'PATCH', { quantity, operation })
		.then((cartProduct) => {
			dispatch(editCartProduct(cartProduct.data))
		})
		.catch((error) => {
			console.error('Ошибка при редактировании продукта в корзине:', error)
		})
		.finally(() => dispatch(setIsLoading(false, false, false)))
}
