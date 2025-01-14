import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { PAGINTATION_LIMIT } from '../../constants/pagination-limit'
import { Pagination } from './components/pagination/pagination'
import { Search } from './search'
import { debounce } from './utils/debounce'
import { request } from '../../utils/request'
import { ProductCard } from './components/post-card/product-card'
import { useDispatch, useSelector } from 'react-redux'
import { productsSelector } from '../../selectors/products-selectors/products-selector'
import { setProductsAsync } from '../../actions/set-products-async'

const MainContainer = ({ className }) => {
	// const [products, setProducts] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)
	const [searchPhrase, setSearchPhrase] = useState('')
	const [shouldSearch, setShouldSearch] = useState(false)

	const products = useSelector(productsSelector)
	const dispatch = useDispatch()

	useEffect(() => {
		request(
			`/products?search=${searchPhrase}&page=${page}&limit=${PAGINTATION_LIMIT}`
		).then(({ data: { products, lastPage } }) => {
			dispatch(setProductsAsync(products))
			setLastPage(lastPage)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch])

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value)
		startDelayedSearch(!shouldSearch)
	}

	return (
		<div className={className}>
			<div className='posts-and-search'>
				<Search
					searchPhrase={searchPhrase}
					onChange={onSearch}
				/>
				{products?.length > 0 ? (
					<div className='post-list'>
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
					<div className='no-posts-found'>Статьи не найдены</div>
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
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}
	& .posts-and-search {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	& .no-posts-found {
		text-align: center;
		font-size: 18px;
		margin-top: 40px;
	}
`
