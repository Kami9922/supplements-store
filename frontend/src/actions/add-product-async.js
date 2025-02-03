import { request } from '../utils/request'
import { addProduct } from './add-product'
import { CLOSE_MODAL } from './close-modal'

export const addProductAsync = (newProduct) => (dispatch) => {
	request('/products', 'POST', newProduct)
		.then((product) => {
			dispatch(addProduct(product.data))
			dispatch(CLOSE_MODAL)
		})
		.catch((error) => {
			console.error('Ошибка при добавлении продукта:', error)
		})
}
