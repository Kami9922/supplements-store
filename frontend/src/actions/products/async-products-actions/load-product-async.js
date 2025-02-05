import { request } from '../../../utils/request'
import { setIsLoading } from '../../other/set-is-loading'
import { setProductData } from '../products-actions/set-product-data'

export const loadProductAsync = (productId) => (dispatch) =>
	request(`/products/${productId}`)
		.then((productData) => {
			if (productData.data) {
				dispatch(setProductData(productData.data))
			}
		})
		.catch((error) => {
			console.error('Ошибка при загрузке продукта:', error)
		})
		.finally(() => dispatch(setIsLoading(false, false)))
