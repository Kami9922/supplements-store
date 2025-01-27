import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { setCartProductsAsync } from '../../../actions/set-cart-products-async'
import { cartProductsSelector } from '../../../selectors/cart-selectors/cart-products-selector'
import { CartProductCard } from './cart-product-card'
import { setIsLoading } from '../../../actions/set-is-loading'
import { isLoadingSelector } from '../../../selectors/app-selectors/is-loading-selector'
import { Loader } from '../../../components/loader/loader'
import { refreshFlagSelector } from '../../../selectors/app-selectors/refhresh-flag-selector'

const CartProductsContainer = ({ className }) => {
	const cartProducts = useSelector(cartProductsSelector)
	const isLoading = useSelector(isLoadingSelector)

	const dispatch = useDispatch()
	const flag = useSelector(refreshFlagSelector)

	useEffect(() => {
		dispatch(setIsLoading(true, true))
		dispatch(setCartProductsAsync())
	}, [dispatch, flag])

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
