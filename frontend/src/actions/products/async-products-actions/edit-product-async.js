import { request } from '../../../utils/request'
import { editProduct } from '../products-actions/edit-product'

export const editProductAsync = (id, productData) => (dispatch) => {
	request(`/products/${id}`, 'PATCH', productData)
		.then((product) => dispatch(editProduct(product.data)))
		.catch((error) => {
			console.error('Ошибка при добавлении продукта:', error)
		})
}
