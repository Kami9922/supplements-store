import { request } from '../utils/request'
import { setAllProducts } from './set-all-products'
import { setCategories } from './set-categories'
import { setIsLoading } from './set-is-loading'
import { setLastPage } from './set-last-page'
import { setProducts } from './set-products'

const filterCategories = (products) => [
	...new Set(products.map((product) => product.category)),
]

export const setProductsAsync =
	(paginate, searchPhrase, page, PAGINTATION_LIMIT) => (dispatch) => {
		const pathWithSearch = `/products?search=${searchPhrase}&page=${page}&limit=${PAGINTATION_LIMIT}`
		const pathWithoutSearch = `/products`
		request(paginate ? pathWithSearch : pathWithoutSearch)
			.then(({ data }) => {
				const products = data.products
				dispatch(setProducts(products))

				page && dispatch(setLastPage(data.lastPage))
			})
			.finally(() => dispatch(setIsLoading(false, false)))

		request(pathWithoutSearch).then(({ data }) => {
			const products = data.products
			dispatch(setAllProducts(products))

			const categories = filterCategories(products)
			dispatch(setCategories(categories))
		})
	}
