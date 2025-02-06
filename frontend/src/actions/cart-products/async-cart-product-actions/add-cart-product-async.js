import { request } from '../../../utils/request'
import { setIsLoading } from '../../other/set-is-loading'
import { addCartProduct } from '../cart-product-actions/add-cart-product'

export const addCartProductAsync = (id) => (dispatch) => {
	request('/carts', 'POST', { id })
		.then((cartProduct) => {
			dispatch(addCartProduct(cartProduct.data))
		})
		.catch((error) => {
			console.error('Ошибка при добавлении продукта в корзину:', error)
		})
		.then(() => dispatch(setIsLoading(false, false, false)))
}
