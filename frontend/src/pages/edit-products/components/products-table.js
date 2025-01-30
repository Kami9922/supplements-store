import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { productsSelector } from '../../../selectors/products-selectors/products-selector'
import { useEffect } from 'react'
import { setProductsAsync } from '../../../actions/set-products-async'
import { Icon } from '../../../components/icon/icon'
import { AddingPanel } from './adding-panel'
import { removeProductAsync } from '../../../actions/remove-product-async'
import { editProductAsync } from '../../../actions/edit-product-async'
import { openModal } from '../../../actions/open-modal'
import { CLOSE_MODAL } from '../../../actions/close-modal'
import { setIsLoading } from '../../../actions/set-is-loading'
import { isLoadingSelector } from '../../../selectors/app-selectors/is-loading-selector'
import { Loader } from '../../../components/loader/loader'
import { setProductData } from '../../../actions/set-product-data'

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
							<th>№</th>
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
								<td>{index + 1}</td>
								<td>{product.title}</td>
								<td>{product.category}</td>
								<td>{product.cost + '₽'}</td>
								<td>{product.storeAmount}</td>
								<td className='td-info'>{product.info}</td>
								{/* <td className='td-image'>{product.imageUrl}</td> */}
								<td className='td-actions'>
									<Icon
										width='100%'
										className='td-icon'
										id='fa-pencil-square-o'
										margin='2px 0px 0px 0px'
										onClick={() => onEditProduct(product)}
									/>
									<Icon
										width='100%'
										className='td-icon'
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
	padding: 5px;

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
	}
	& .td-info {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	& .td-actions {
		border: none;
		display: flex;
		gap: 5px;
		padding: 0 5px;
	}

	& .td-icon {
		border: 1px solid black;
		border-radius: 5px;
		display: flex;
		align-items: center;
		padding: 3px;
		justify-content: center;
	}

	& .th-actions {
		border: none;
	}
`
