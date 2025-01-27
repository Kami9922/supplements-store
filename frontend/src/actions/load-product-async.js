import { request } from '../utils/request'
import { setIsLoading } from './set-is-loading'
import { setProductData } from './set-product-data'

export const loadProductAsync = (productId) => (dispatch) =>
	request(`/products/${productId}`)
		.then((productData) => {
			if (productData.data) {
				dispatch(setProductData(productData.data))
			}
		})
		.finally(() => dispatch(setIsLoading(false, false)))
