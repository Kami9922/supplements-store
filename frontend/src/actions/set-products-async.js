import { setProducts } from './set-products'

export const setProductsAsync = (products) => (dispatch) =>
	dispatch(setProducts(products))
