import { setCategories } from '../../other/set-categories'
import { setIsLoading } from '../../other/set-is-loading'

import { setAllProducts } from '../products-actions/set-all-products'
import { setProducts } from '../products-actions/set-products'
import { setLastPage } from '../../other/set-last-page'
import { request } from '../../../utils/request'
import { setErrorMessage } from '../../other/set-error-message'

const filterCategories = (products) => [
	...new Set(products.map((product) => product.category)),
]

export const setProductsAsync =
	(searchPhrase, page, PAGINTATION_LIMIT, sortBy, category) => (dispatch) => {
		const pathWithSearch = `/products?
	${searchPhrase ? `&search=${searchPhrase}` : ''} 
	${page ? `&page=${page}` : ''}
	${sortBy ? `&sortBy=${sortBy}` : ''}
	${PAGINTATION_LIMIT ? `&limit=${PAGINTATION_LIMIT}` : ''}
	${category ? `&category=${category}` : ''}`

		const pathWithoutSearch = `/products`

		const errorMessage = 'Ошибка при получении информации о продуктах'

		request(pathWithSearch)
			.then(({ data }) => {
				const products = data.products
				dispatch(setProducts(products))
				page && dispatch(setLastPage(data.lastPage))
			})
			.catch((error) => {
				console.error(error.message)
				dispatch(setErrorMessage(errorMessage))
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
				console.error(error.message)
				dispatch(setErrorMessage(errorMessage))
			})
	}
