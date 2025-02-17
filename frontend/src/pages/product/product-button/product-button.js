import React from 'react'
import styled from 'styled-components'
import { Button } from '../../../components/button/button'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../../components/loader/loader'
import { isLoadingSelector } from '../../../selectors/app-selectors/is-loading-selector'
import { onAddCartProduct } from '../../../utils/on-add-cart-product'
import { cartProductsSelector } from '../../../selectors/cart-selectors/cart-products-selector'
import { selectUserRole } from '../../../selectors/user-selectors/select-user-role'

const ProductButtonContainer = ({ className, product }) => {
	const userRole = useSelector(selectUserRole)
	const isLoading = useSelector(isLoadingSelector)
	const cartProducts = useSelector(cartProductsSelector)

	const dispatch = useDispatch()

	return (
		<div className={className}>
			{isLoading.locatedLoaderId === product.id ? (
				<Loader
					size='36px'
					className='product-loader'
				/>
			) : (
				<Button
					disabled={isLoading.status}
					width='250px'
					onClick={() =>
						onAddCartProduct(
							dispatch,
							userRole,
							cartProducts,
							product.title,
							product.id
						)
					}>
					В корзину
				</Button>
			)}
		</div>
	)
}

export const ProductButton = styled(ProductButtonContainer)`
	display: flex;
	justify-content: end;
	padding-top: 25px;
	border-top: 1px solid #000;

	& .product-loader {
		position: inherit;
		margin-right: 11%;
	}
`
