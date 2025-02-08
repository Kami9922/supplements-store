import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { PAGINTATION_LIMIT } from '../../constants/pagination-limit'
import { Pagination } from './components/pagination/pagination'
import { Search } from './search'
import { debounce } from './utils/debounce'
import { ProductCard } from './components/product-card/product-card'
import { useDispatch, useSelector } from 'react-redux'
import { productsSelector } from '../../selectors/products-selectors/products-selector'
import { setProductsAsync } from '../../actions/products/async-products-actions/set-products-async'
import { setIsLoading } from '../../actions/other/set-is-loading'
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
	const [sortBy, setSortBy] = useState(null)
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [isChoosingCategory, setIsChoosingCategory] = useState(false)
	const [isChoosingSortType, setIsChoosingSortType] = useState(false)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setIsLoading(true, true))
		dispatch(
			setProductsAsync(
				true,
				searchPhrase,
				page,
				PAGINTATION_LIMIT,
				sortBy,
				selectedCategory
			)
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch, sortBy, selectedCategory, dispatch])

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 600), [])

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value)
		startDelayedSearch(!shouldSearch)
	}

	const sortProductsByCost = (order) => {
		setSortBy(order === 'asc' ? 'costAsc' : 'costDesc')
	}

	const sortProductsByCategory = (category) => {
		setPage(1)
		setSelectedCategory(category)
	}

	const resetSorting = () => {
		setSortBy(null)
		setIsChoosingCategory(false)
		setIsChoosingSortType(false)
		setSelectedCategory(null)
	}

	return (
		<div className={className}>
			<div className='products-and-search'>
				<Search
					searchPhrase={searchPhrase}
					onChange={onSearch}
				/>

				<SortButtons
					setIsChoosingSortType={setIsChoosingSortType}
					isChoosingSortType={isChoosingSortType}
					sortProductsByCost={sortProductsByCost}
					sortProductsByCategory={sortProductsByCategory}
					resetSorting={resetSorting}
					sortBy={sortBy}
					isChoosingCategory={isChoosingCategory}
					setIsChoosingCategory={setIsChoosingCategory}
				/>

				{isLoading.loader ? (
					<Loader size='40px' />
				) : products?.length > 0 ? (
					<div className='product-list'>
						{products.map(({ id, title, cost, imageUrl }) => (
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
