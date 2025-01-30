import { request } from '../utils/request'
import { editProduct } from './edit-product'

export const editProductAsync = (id, productData) => (dispatch) => {
	request(`/products/${id}`, 'PATCH', productData).then((product) =>
		dispatch(editProduct(product.data))
	)
}
