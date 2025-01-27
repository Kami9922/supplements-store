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
import { Button } from '../../components/button/button'

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
	const [originalProducts, setOriginalProducts] = useState([]) // Состояние для оригинальных продуктов

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setProductsAsync(searchPhrase, page, PAGINTATION_LIMIT))
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

	const resetSorting = () => {
		setMainProducts(originalProducts)
		setIsSorting(false)
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

				<div className='sort-buttons'>
					<Button
						className='sort-button'
						background='transparent'
						color='#000'
						height='40px'
						width='260px'
						onClick={sortProductsByCost}>
						Сортировать по стоимости
					</Button>

					{isSorting && (
						<Button
							className='reset-button'
							color='rgb(129, 129, 129)'
							background='transparent'
							width='100px'
							onClick={resetSorting}>
							Сбросить
						</Button>
					)}
				</div>

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

	& .sort-buttons {
		display: flex;
		flex-direction: column;
		/* margin: 0 auto; */
		padding-top: 30px;
		padding-left: 40px;
		gap: 5px;
		/* align-items: center; */
	}

	& .sort-button {
		padding: 5px;
		border: 1px solid rgb(211, 211, 211);
	}
	& .sort-button:hover {
		border: 1px solid rgb(121, 121, 121);
	}

	& .reset-button {
		padding-left: 10px;
	}

	& .reset-button:hover {
		color: rgb(199, 199, 199);
	}
`
