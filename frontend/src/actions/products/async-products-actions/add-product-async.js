import { request } from '../../../utils/request'
import { CLOSE_MODAL } from '../../modal/close-modal'
import { setErrorMessage } from '../../other/set-error-message'
import { addProduct } from '../products-actions/add-product'

export const addProductAsync = (newProduct) => (dispatch) => {
	request('/products', 'POST', newProduct)
		.then((product) => {
			dispatch(addProduct(product.data))
			dispatch(CLOSE_MODAL)
		})
		.catch((error) => {
			console.error(error.message)
			dispatch(setErrorMessage('Ошибка при добавлении продукта'))
		})
}
