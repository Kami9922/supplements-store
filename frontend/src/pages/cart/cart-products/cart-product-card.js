import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '../../../components/icon/icon'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoading } from '../../../actions/other/set-is-loading'
import { removeCartProductAsync } from '../../../actions/cart-products/async-cart-product-actions/remove-cart-product-async'
import { productsSelector } from '../../../selectors/products-selectors/products-selector'
import { isLoadingSelector } from '../../../selectors/app-selectors/is-loading-selector'
import { Loader } from '../../../components/loader/loader'
import { CartQuantityButtons } from './cart-quantity-buttons'

const CartProductCardContainer = ({ className, cartProduct }) => {
	const dispatch = useDispatch()
	const products = useSelector(productsSelector)

	const isLoading = useSelector(isLoadingSelector)

	const onRemoveCartProduct = (id) => {
		dispatch(setIsLoading(true, false, id))
		dispatch(removeCartProductAsync(id))
	}

	const matchedTitle = `/product/${
		products.find((product) => product.title === cartProduct.title)?.id
	}`

	return (
		<div className={className}>
			<div className='cart-product-card-container'>
				<div className='cart-product-info'>
					<Link
						className='cart-image'
						to={matchedTitle}>
						<img
							alt={cartProduct.imageUrl}
							src={cartProduct.imageUrl}
						/>
					</Link>
					{isLoading.locatedLoaderId === cartProduct.id ? (
						<Loader className='cart-product-loader' />
					) : (
						<div className='right-cart-block'>
							<div className='cart-card-text'>
								<span className='cart-card-title'>{cartProduct.title}</span>
								<span className='cart-card-cost'>{cartProduct.cost + '₽'}</span>
								<span className='cart-card-cost'>
									{'x' + cartProduct.quantity}
								</span>
							</div>
							<CartQuantityButtons
								onRemoveCartProduct={onRemoveCartProduct}
								cartProduct={cartProduct}
							/>
						</div>
					)}
				</div>

				<Icon
					size='40px'
					className='cart-remove-icon'
					id='fa fa-times'
					margin='0px 0px 0px 0px'
					onClick={() => onRemoveCartProduct(cartProduct.id)}
				/>
			</div>
		</div>
	)
}

export const CartProductCard = styled(CartProductCardContainer)`
	& .cart-product-card-container {
		display: flex;
		padding: 20px;
		margin-right: 30px;
		justify-content: space-between;
		border: 1px solid #000;
		border-radius: 10px;
	}

	& .cart-product-info {
		display: flex;
	}

	& .cart-product-loader {
		position: inherit;
		margin: 50px 50px 50px 125px;
	}

	& .right-cart-block {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 15px;
		margin-bottom: 10px;
	}

	& .cart-card-text {
		display: flex;
		flex-direction: column;
	}

	& .cart-remove-icon {
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
	}
	& .cart-remove-icon:hover {
		font-size: 45px;
		transform: translate(0px, -5px);
	}

	& .cart-image {
		display: flex;
	}

	& img {
		border-radius: 10px;
		width: 280px;
		height: 150px;
	}

	& .cart-card-title {
		font-size: 20px;
		width: 100%;
	}
	& .cart-card-cost {
		font-weight: bold;
		color: rgb(163, 163, 163);
	}
`
