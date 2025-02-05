import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { cartProductsSelector } from '../../../selectors/cart-selectors/cart-products-selector'
import { CartProductCard } from './cart-product-card'

import { isLoadingSelector } from '../../../selectors/app-selectors/is-loading-selector'
import { Loader } from '../../../components/loader/loader'
import { setCartProductsAsync } from '../../../actions/cart-products/async-cart-product-actions/set-cart-products-async'
import { setIsLoading } from '../../../actions/other/set-is-loading'

const CartProductsContainer = ({ className }) => {
	const cartProducts = useSelector(cartProductsSelector)
	const isLoading = useSelector(isLoadingSelector)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setIsLoading(true, true))
		dispatch(setCartProductsAsync())
	}, [dispatch])

	return (
		<div className={className}>
			{isLoading.loader ? (
				<Loader />
			) : cartProducts.length > 0 ? (
				cartProducts?.map((cartProduct) => (
					<CartProductCard
						key={cartProduct.id}
						cartProduct={cartProduct}
						quantity={cartProduct.quantity}
					/>
				))
			) : (
				<div className='empty-cart'>Корзина пуста</div>
			)}
		</div>
	)
}

export const CartProducts = styled(CartProductsContainer)`
	width: 70%;
	display: flex;
	flex-direction: column;
	position: relative;
	gap: 15px;

	& .empty-cart {
		margin: auto;
		font-size: 20px;
		font-style: italic;
		/* text-align: center; */
	}
`
