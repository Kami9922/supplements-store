import { request } from '../../../utils/request'
import { setErrorMessage } from '../../other/set-error-message'
import { editProduct } from '../products-actions/edit-product'

export const editProductAsync = (id, productData) => (dispatch) => {
	request(`/products/${id}`, 'PATCH', productData)
		.then((product) => dispatch(editProduct(product.data)))
		.catch((error) => {
			console.error(error.message)
			dispatch(setErrorMessage('Ошибка при редактировании продукта'))
		})
}
