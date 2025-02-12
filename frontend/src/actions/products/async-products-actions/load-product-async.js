import { request } from '../../../utils/request'
import { setErrorMessage } from '../../other/set-error-message'
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
			console.error(error.message)
			dispatch(setErrorMessage('Ошибка при загрузке продукта'))
		})
		.finally(() => dispatch(setIsLoading(false, false)))
