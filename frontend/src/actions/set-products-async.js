import { request } from '../utils/request'
import { setIsLoading } from './set-is-loading'
import { setLastPage } from './set-last-page'
import { setProducts } from './set-products'

export const setProductsAsync =
	(searchPhrase, page, PAGINTATION_LIMIT) => (dispatch) => {
		const pathWithSearch = `/products?search=${searchPhrase}&page=${page}&limit=${PAGINTATION_LIMIT}`
		const pathWithoutSearch = `/products`
		request(
			page || searchPhrase || PAGINTATION_LIMIT
				? pathWithSearch
				: pathWithoutSearch
		)
			.then(({ data }) => {
				dispatch(setProducts(data.products))
				page && dispatch(setLastPage(data.lastPage))
			})
			.finally(() => dispatch(setIsLoading(false, false)))
	}
