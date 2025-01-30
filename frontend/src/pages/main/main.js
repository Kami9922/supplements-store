import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { PAGINTATION_LIMIT } from '../../constants/pagination-limit'
import { Pagination } from './components/pagination/pagination'
import { Search } from './search'
import { debounce } from './utils/debounce'
import { ProductCard } from './components/product-card/product-card'
import { useDispatch, useSelector } from 'react-redux'
import { productsSelector } from '../../selectors/products-selectors/products-selector'
import { setProductsAsync } from '../../actions/set-products-async'
import { setIsLoading } from '../../actions/set-is-loading'
import { isLoadingSelector } from '../../selectors/app-selectors/is-loading-selector'
import { Loader } from '../../components/loader/loader'
import { lastPageSelector } from '../../selectors/products-selectors/last-page-selector'
import { SortButtons } from './components/sort-buttons/sort-buttons'

const MainContainer = ({ className }) => {
	const isLoading = useSelector(isLoadingSelector)
	const lastPage = useSelector(lastPageSelector)
	const products = useSelector(productsSelector)

	const [page, setPage] = useState(1)
	const [searchPhrase, setSearchPhrase] = useState('')
	const [shouldSearch, setShouldSearch] = useState(false)
	const [isAscending, setIsAscending] = useState(true)
	const [isSorting, setIsSorting] = useState(false)
	const [mainProducts, setMainProducts] = useState([])
	const [isChoosingCategory, setIsChoosingCategory] = useState(false)
	const [originalProducts, setOriginalProducts] = useState([])

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setProductsAsync(true, searchPhrase, page, PAGINTATION_LIMIT))
		dispatch(setIsLoading(true, true))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch, dispatch])

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

	useEffect(() => {
		setOriginalProducts(products)
		setMainProducts(products)
	}, [products])

	const sortProductsByCost = () => {
		const newProducts = [...mainProducts].sort((a, b) => {
			if (isAscending) {
				return a.cost - b.cost
			} else {
				return b.cost - a.cost
			}
		})
		setMainProducts(newProducts)
		setIsAscending(!isAscending)
		setIsSorting(true)
	}

	const onCategoriesClick = () => {
		setIsSorting(true)
		setIsChoosingCategory(true)
	}

	const sortProductsByCategory = (products, categoryToCompare) => {
		console.log(categoryToCompare)
		const updatedProducts = products.filter(
			(item) => item.category === categoryToCompare
		)
		console.log(updatedProducts)

		setMainProducts(updatedProducts)
	}

	const resetSorting = () => {
		setMainProducts(originalProducts)
		setIsSorting(false)
		setIsChoosingCategory(false)
	}

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value)
		startDelayedSearch(!shouldSearch)
	}

	return (
		<div className={className}>
			<div className='products-and-search'>
				<Search
					searchPhrase={searchPhrase}
					onChange={onSearch}
				/>

				<SortButtons
					isChoosingCategory={isChoosingCategory}
					sortProductsByCategory={sortProductsByCategory}
					onCategoriesClick={onCategoriesClick}
					resetSorting={resetSorting}
					sortProductsByCost={sortProductsByCost}
					isSorting={isSorting}
				/>

				{isLoading.loader ? (
					<Loader size='40px' />
				) : products?.length > 0 ? (
					<div className='product-list'>
						{mainProducts.map(({ id, title, cost, imageUrl }) => (
							<ProductCard
								key={id}
								id={id}
								title={title}
								imageUrl={imageUrl}
								cost={cost + '₽'}
							/>
						))}
					</div>
				) : (
					<div className='no-products-found'>Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && products.length > 0 && (
				<Pagination
					page={page}
					lastPage={lastPage}
					setPage={setPage}
				/>
			)}
		</div>
	)
}

export const Main = styled(MainContainer)`
	& .product-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}
	& .products-and-search {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	& .no-products-found {
		text-align: center;
		font-size: 18px;
		margin-top: 40px;
	}
`
