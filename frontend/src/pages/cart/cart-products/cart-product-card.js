import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '../../../components/icon/icon'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoading } from '../../../actions/set-is-loading'
import { editCartProductAsync } from '../../../actions/edit-cart-product-async'
import { removeCartProductAsync } from '../../../actions/remove-cart-product-async'
import { productsSelector } from '../../../selectors/products-selectors/products-selector'
import { Button } from '../../../components/button/button'
import { onAddCartProduct } from '../../../utils/on-add-cart-product'
import { cartProductsSelector } from '../../../selectors/cart-selectors/cart-products-selector'
import { isLoadingSelector } from '../../../selectors/app-selectors/is-loading-selector'
import { Loader } from '../../../components/loader/loader'

const CartProductCardContainer = ({ className, cartProduct }) => {
	const dispatch = useDispatch()
	const products = useSelector(productsSelector)
	const cartProducts = useSelector(cartProductsSelector)
	const isLoading = useSelector(isLoadingSelector)

	const onRemoveCartProduct = (id) => {
		dispatch(setIsLoading(true, true))
		dispatch(removeCartProductAsync(id))
	}

	const onReduceCartProduce = (id, quantity) => {
		if (quantity <= 1) {
			dispatch(removeCartProductAsync(id))
			return
		}
		dispatch(setIsLoading(true, false))
		dispatch(editCartProductAsync(id, quantity, 'reduce'))
	}

	return (
		<div className={className}>
			<div className='cart-product-card-container'>
				{isLoading.loader ? (
					<Loader />
				) : (
					<>
						<div className='cart-product-info'>
							<Link
								className='cart-image'
								to={`/product/${
									products.find(
										(product) => product.title === cartProduct.title
									)?.id
								}`}>
								<img
									alt={cartProduct.imageUrl}
									src={cartProduct.imageUrl}
								/>
							</Link>
							<div className='right-cart-block'>
								<div className='cart-cart-text'>
									<span className='cart-card-title'>{cartProduct.title}</span>
									<span className='cart-card-cost'>
										{cartProduct.cost + '₽'}
									</span>
									<span className='cart-card-cost'>
										{'x' + cartProduct.quantity}
									</span>
								</div>
								<div className='cart-quantity-buttons'>
									<Button
										background='rgb(201, 165, 89)'
										width='30px'
										disabled={isLoading.status}
										onClick={() =>
											onAddCartProduct(
												dispatch,
												cartProducts,
												cartProduct.title,
												cartProduct.id
											)
										}>
										+
									</Button>
									<Button
										background='rgb(201, 165, 89)'
										width='30px'
										disabled={isLoading.status}
										onClick={() =>
											onReduceCartProduce(cartProduct.id, cartProduct.quantity)
										}>
										-
									</Button>
								</div>
							</div>
						</div>
						<Icon
							size='40px'
							className='cart-remove-icon'
							id='fa fa-times'
							margin='0px 0px 0px 0px'
							onClick={() => onRemoveCartProduct(cartProduct.id)}
						/>
					</>
				)}
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

	& .cart-quantity-buttons {
		display: flex;
		gap: 5px;
	}

	& .right-cart-block {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 15px;
		margin-bottom: 10px;
	}

	& .cart-cart-text {
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
