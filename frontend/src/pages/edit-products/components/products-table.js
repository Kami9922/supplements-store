import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { productsSelector } from '../../../selectors/app-selectors/products-selector'
import { useEffect } from 'react'
import { request } from '../../../utils/request'
import { setProductsAsync } from '../../../actions/set-products-async'

export const ProductsTableContainer = ({ className }) => {
	const products = useSelector(productsSelector)
	const dispatch = useDispatch()

	useEffect(() => {
		request(`/products`).then(({ data: { products } }) => {
			dispatch(setProductsAsync(products))
		})
	}, [dispatch])

	return (
		<div className={className}>
			<table>
				<thead>
					<tr>
						<th>№</th>
						<th>Категория</th>
						<th>Стоимость</th>
						<th>Количество</th>
						<th>Фото</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product, index) => (
						<tr key={product.id}>
							<td>{index + 1}</td>
							<td>{product.category}</td>
							<td>{product.cost}</td>
							<td>{product.amount}</td>
							<td>{product.imageUrl}</td>
							<td>Удалить</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export const ProductsTable = styled(ProductsTableContainer)``
