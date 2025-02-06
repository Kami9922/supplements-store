import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../../../../components/button/button'
import { useDispatch, useSelector } from 'react-redux'
import { cartProductsSelector } from '../../../../selectors/cart-selectors/cart-products-selector'
import { isLoadingSelector } from '../../../../selectors/app-selectors/is-loading-selector'
import { onAddCartProduct } from '../../../../utils/on-add-cart-product'
import { selectUserRole } from '../../../../selectors/user-selectors/select-user-role'
import { Loader } from '../../../../components/loader/loader'

const ProductCardContainer = ({ className, id, title, imageUrl, cost }) => {
	const cartProducts = useSelector(cartProductsSelector)
	const isLoading = useSelector(isLoadingSelector)
	const userRole = useSelector(selectUserRole)

	const dispatch = useDispatch()

	return (
		<div className={className}>
			<div className='product-card-container'>
				<Link to={`/product/${id}`}>
					<img
						className='card-image'
						alt={imageUrl}
						src={imageUrl}
					/>
				</Link>
				<span className='card-cost'>{cost}</span>
				<span className='card-title'>{title}</span>
				{isLoading.locatedLoaderId === id ? (
					<Loader
						size='35px'
						className='product-loader'
					/>
				) : (
					<Button
						className='product-card-buttons'
						disabled={isLoading.status}
						onClick={() =>
							onAddCartProduct(dispatch, userRole, cartProducts, title, id)
						}>
						В корзину
					</Button>
				)}
			</div>
		</div>
	)
}

export const ProductCard = styled(ProductCardContainer)`
	font-family: Comfortaa;
	& .product-card-container {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 280px;
		margin: 20px;
		border-radius: 15px;
	}

	& .product-loader {
		position: static;
	}

	& .card-title {
		align-self: flex-start;
		margin-bottom: 5px;
		padding: 0px 5px 5px;
		font-weight: 500;
	}
	& img {
		border-radius: 10px;
		width: 280px;
		height: 150px;
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
