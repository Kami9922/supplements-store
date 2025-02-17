import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { productsSelector } from '../../../selectors/products-selectors/products-selector'
import { useEffect, useMemo, useState } from 'react'
import { setProductsAsync } from '../../../actions/products/async-products-actions/set-products-async'
import { AddingPanel } from './adding-panel'
import { setIsLoading } from '../../../actions/other/set-is-loading'
import { isLoadingSelector } from '../../../selectors/app-selectors/is-loading-selector'
import { Loader } from '../../../components/loader/loader'
import { debounce } from '../../main/utils/debounce'
import { Search } from '../../main/search'
import { TrProduct } from './tr-product'

export const ProductsTableContainer = ({ className }) => {
	const products = useSelector(productsSelector)
	const isLoading = useSelector(isLoadingSelector)

	const dispatch = useDispatch()

	const [searchPhrase, setSearchPhrase] = useState('')
	const [shouldSearch, setShouldSearch] = useState(false)

	useEffect(() => {
		dispatch(setIsLoading(true, true))
		dispatch(setProductsAsync(searchPhrase))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shouldSearch, dispatch])

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value)
		startDelayedSearch(!shouldSearch)
	}

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 1000), [])

	return (
		<div className={className}>
			<h3>Таблица товаров</h3>
			<Search
				searchPhrase={searchPhrase}
				onChange={onSearch}
			/>
			<AddingPanel />
			{isLoading.loader ? (
				<Loader size='40px' />
			) : products?.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th className='th-image'>Изображение</th>
							<th>Название</th>
							<th>Категория</th>
							<th>Стоимость</th>
							<th>Количество</th>
							<th>Описание</th>
							<th className='th-actions'></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<TrProduct
								key={product.id}
								product={product}
							/>
						))}
					</tbody>
				</table>
			) : (
				<div className='no-products-found'>Продукты не найдены</div>
			)}
		</div>
	)
}

export const ProductsTable = styled(ProductsTableContainer)`
	display: flex;
	flex-direction: column;

	& h3 {
		text-align: center;
		font-size: 30px;
		padding-top: 15px;
		margin: 0 0 25px 0;
	}

	& table {
		table-layout: fixed;
		width: 100%;
		padding-top: 15px;
	}

	& th {
		border: 1px solid #000;
		border-radius: 3px;
	}
	& td {
		border: 1px solid #000;
		border-radius: 3px;
		padding: 5px;
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	& td img {
		width: 100%;
		max-height: 70px;
	}

	& .td-image {
		padding-bottom: 0px;
	}

	& .td-icon:hover {
		transform: translate(1px, -1px);
	}

	& .th-actions {
		border: none;
	}
`
