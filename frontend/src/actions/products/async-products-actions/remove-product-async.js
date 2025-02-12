import { request } from '../../../utils/request'
import { setErrorMessage } from '../../other/set-error-message'
import { setIsLoading } from '../../other/set-is-loading'
import { removeProduct } from '../products-actions/remove-product'

export const removeProductAsync = (id) => (dispatch) =>
	request(`/products/${id}`, 'DELETE')
		.then(() => dispatch(removeProduct(id)))
		.catch((error) => {
			console.error(error.message)
			dispatch(setErrorMessage('Ошибка при удалении продукта'))
		})
		.finally(() => dispatch(setIsLoading(false, false)))
