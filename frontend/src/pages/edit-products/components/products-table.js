import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { productsSelector } from '../../../selectors/products-selectors/products-selector'
import { useEffect } from 'react'
import { setProductsAsync } from '../../../actions/products/async-products-actions/set-products-async'
import { Icon } from '../../../components/icon/icon'
import { AddingPanel } from './adding-panel'
import { removeProductAsync } from '../../../actions/products/async-products-actions/remove-product-async'
import { editProductAsync } from '../../../actions/products/async-products-actions/edit-product-async'
import { openModal } from '../../../actions/modal/open-modal'
import { CLOSE_MODAL } from '../../../actions/modal/close-modal'
import { setIsLoading } from '../../../actions/other/set-is-loading'
import { isLoadingSelector } from '../../../selectors/app-selectors/is-loading-selector'
import { Loader } from '../../../components/loader/loader'
import { setProductData } from '../../../actions/products/products-actions/set-product-data'

export const ProductsTableContainer = ({ className }) => {
	const products = useSelector(productsSelector)
	const isLoading = useSelector(isLoadingSelector)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setIsLoading(true, true))
		dispatch(setProductsAsync(false))
	}, [dispatch])

	const onRemoveProduct = (id) => {
		dispatch(removeProductAsync(id))
		dispatch(setIsLoading(true, true))
	}
	const onEditProduct = (product) => {
		dispatch(setProductData(product))
		dispatch(
			openModal({
				onConfirm: (id, productData, reset) => {
					dispatch(editProductAsync(id, productData))
					dispatch(CLOSE_MODAL)
					reset()
				},
				isOpen: {
					product: true,
					cart: false,
				},
			})
		)
	}

	return (
		<div className={className}>
			<h3>Таблица товаров</h3>
			<AddingPanel />

			{isLoading.loader ? (
				<Loader size='40px' />
			) : (
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
						{products.map((product, index) => (
							<tr key={product.id}>
								<td className='td-image'>
									<img
										alt={product.imageUrl}
										src={product.imageUrl}
									/>
								</td>
								<td>{product.title}</td>
								<td>{product.category}</td>
								<td>{product.cost + '₽'}</td>
								<td>{product.storeAmount}</td>
								<td className='td-info'>{product.info}</td>
								<td className='td-actions'>
									<Icon
										width='75px'
										className='td-icon'
										background='rgb(209, 209, 209)'
										id='fa-pencil-square-o'
										margin='2px 0px 0px 0px'
										onClick={() => onEditProduct(product)}
									/>
									<Icon
										width='75px'
										className='td-icon'
										background='rgb(247, 68, 68)'
										color='rgb(0, 0, 0)'
										id='fa fa-times'
										margin='2px 0px 0px 0px'
										onClick={() => onRemoveProduct(product.id)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export const ProductsTable = styled(ProductsTableContainer)`
	& h3 {
		text-align: center;
		font-size: 30px;
		padding-top: 15px;
		margin: 0 0 25px 0;
	}

	& table {
		table-layout: fixed;
		width: 100%;
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

	& .td-actions {
		display: flex;
		flex-direction: column;
		padding: 0 5px;
		border: none;
	}

	& .td-icon {
		border: 1px solid black;
		border-radius: 5px;
		display: flex;
		align-items: center;
		padding: 3px;
		justify-content: center;
	}
	& .td-icon:hover {
		transform: translate(1px, -1px);
	}

	& .th-actions {
		border: none;
	}
`
