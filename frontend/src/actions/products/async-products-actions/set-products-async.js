import { setCategories } from '../../other/set-categories'
import { setIsLoading } from '../../other/set-is-loading'

import { setAllProducts } from '../products-actions/set-all-products'
import { setProducts } from '../products-actions/set-products'
import { setLastPage } from '../../other/set-last-page'
import { request } from '../../../utils/request'

const filterCategories = (products) => [
	...new Set(products.map((product) => product.category)),
]

export const setProductsAsync =
	(paginate, searchPhrase, page, PAGINTATION_LIMIT, sortBy, category) =>
	(dispatch) => {
		const pathWithSearch = `/products?search=${searchPhrase}&page=${page}&limit=${PAGINTATION_LIMIT}${
			sortBy ? `&sortBy=${sortBy}` : ''
		}${category ? `&category=${category}` : ''}`

		const pathWithoutSearch = `/products`

		request(paginate ? pathWithSearch : pathWithoutSearch)
			.then(({ data }) => {
				const products = data.products
				dispatch(setProducts(products))
				page && dispatch(setLastPage(data.lastPage))
			})
			.catch((error) => {
				console.error('Ошибка при получении информации о продуктах:', error)
			})
			.finally(() => dispatch(setIsLoading(false, false)))

		request(pathWithoutSearch)
			.then(({ data }) => {
				const products = data.products
				dispatch(setAllProducts(products))
				const categories = filterCategories(products)
				dispatch(setCategories(categories))
			})
			.catch((error) => {
				console.error('Ошибка при получении информации о продуктах:', error)
			})
	}
