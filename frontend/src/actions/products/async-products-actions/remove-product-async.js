import { request } from '../../../utils/request'
import { setIsLoading } from '../../other/set-is-loading'
import { removeProduct } from '../products-actions/remove-product'

export const removeProductAsync = (id) => (dispatch) =>
	request(`/products/${id}`, 'DELETE')
		.then(() => dispatch(removeProduct(id)))
		.catch((error) => {
			console.error('Ошибка при добавлении продукта:', error)
		})
		.finally(() => dispatch(setIsLoading(false, false)))
