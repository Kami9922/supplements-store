import { request } from '../utils/request'
import { setProductData } from './set-product-data'

export const editProductAsync = (id, productData) => (dispatch) => {
	request(`/products/${id}`, 'PATCH', productData).then(() =>
		dispatch(setProductData(productData.data))
	)
}
