import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../../../../components/button/button'
import { useDispatch, useSelector } from 'react-redux'
import { cartProductsSelector } from '../../../../selectors/cart-selectors/cart-products-selector'
import { isLoadingSelector } from '../../../../selectors/app-selectors/is-loading-selector'
import { onAddCartProduct } from '../../../../utils/on-add-cart-product'

const ProductCardContainer = ({ className, id, title, imageUrl, cost }) => {
	const dispatch = useDispatch()
	const cartProducts = useSelector(cartProductsSelector)
	const isLoading = useSelector(isLoadingSelector)

	return (
		<div className={className}>
			<div className='product-card-container'>
				<Link to={`/product/${id}`}>
					<img
						alt={imageUrl}
						src={imageUrl}
					/>
				</Link>
				<span className='card-cost'>{cost}</span>
				<span className='card-title'>{title}</span>
				<Button
					disabled={isLoading.status}
					onClick={() => onAddCartProduct(dispatch, cartProducts, title, id)}>
					В корзину
				</Button>
			</div>
		</div>
	)
}

export const ProductCard = styled(ProductCardContainer)`
	& .product-card-container {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 280px;
		margin: 20px;
		border-radius: 15px;
	}
	& .card-title {
		align-self: flex-start;
		margin-bottom: 5px;
		padding: 0px 5px 5px;
		font-weight: 500;
	}
	& img {
		border-radius: 10px;
	}

	& .card-cost {
		align-self: flex-start;
		padding: 5px 5px 0px;
		margin-bottom: 5px;
		font-size: 18px;
		font-weight: bold;
		color: rgb(230, 10, 94);
	}
`
