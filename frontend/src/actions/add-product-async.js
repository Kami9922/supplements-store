import { request } from '../utils/request'
import { addProduct } from './add-product'
import { CLOSE_MODAL } from './close-modal'

export const addProductAsync = (newProduct) => (dispatch) =>
	request('/products', 'POST', newProduct).then(() => {
		dispatch(addProduct(newProduct))
		dispatch(CLOSE_MODAL)
	})
