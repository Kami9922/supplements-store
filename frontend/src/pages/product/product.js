import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '../../components/button/button'
import { loadProductAsync } from '../../actions/products/async-products-actions/load-product-async'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productSelector } from '../../selectors/product-selectors/product-selector'
import { setIsLoading } from '../../actions/other/set-is-loading'
import { Loader } from '../../components/loader/loader'
import { isLoadingSelector } from '../../selectors/app-selectors/is-loading-selector'
import { onAddCartProduct } from '../../utils/on-add-cart-product'
import { cartProductsSelector } from '../../selectors/cart-selectors/cart-products-selector'
import { selectUserRole } from '../../selectors/user-selectors/select-user-role'
// import { BASE_URL } from '../../constants/base-url'

const ProductContainer = ({ className }) => {
	const params = useParams()

	const dispatch = useDispatch()
	const BASE_URL = `${window.location.protocol}//${window.location.host}/`
	const userRole = useSelector(selectUserRole)
	const product = useSelector(productSelector)
	const isLoading = useSelector(isLoadingSelector)
	const cartProducts = useSelector(cartProductsSelector)

	useEffect(() => {
		dispatch(loadProductAsync(params.id))
		dispatch(setIsLoading(true, true))
	}, [params.id, dispatch])

	return (
		<div className={className}>
			{isLoading.loader ? (
				<Loader />
			) : (
				<>
					<div>
						<div className='product-container'>
							<div className='product-image-block'>
								<img
									alt={product.imageUrl}
									src={`${BASE_URL}${product.imageUrl}`}
								/>
								<div className='product-consise-description'>
									<span className='about-span'>О товаре</span>
									<div>
										<span className='bold-span product-title'>
											{product.title}
										</span>
									</div>
									<div className='description-span'>
										<span className='bold-span'>Осталось в магазине: </span>
										<span>{product.storeAmount + ' ед.'}</span>
									</div>
									<div className='description-span'>
										<span className='bold-span'>Категория: </span>
										<span>{product.category}</span>
									</div>
									<div className='description-span'>
										<span className='bold-span'>Цена: </span>
										<span>{product.cost + '₽'}</span>
									</div>
								</div>
							</div>
							<div className='product-info'>
								<h3>Описание: </h3>
								<p>{product.info}</p>
							</div>
						</div>
					</div>
					<div className='product-button'>
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
				</>
			)}
		</div>
	)
}

export const Product = styled(ProductContainer)`
	padding: 40px 40px;
	display: flex;
	flex-direction: column;
	min-height: 70vh;
	justify-content: space-between;
	font-family: Comfortaa;

	& .about-span {
		font-weight: bold;
		font-size: 24px;
		color: rgb(158, 158, 158);
	}

	& .product-loader {
		position: inherit;
		margin-right: 11%;
	}

	& p {
		padding-left: 15px;
	}

	& .product-image-block > img {
		width: 350px;
		border-radius: 10px;
	}

	& .product-title {
		font-size: 24px;
	}

	& .bold-span {
		font-weight: 500;
	}

	& .description-span {
		border-top: 1px solid rgba(204, 214, 228, 0.6);
		padding-top: 5px;
	}

	& .product-button {
		display: flex;
		justify-content: end;
		padding-top: 25px;
		border-top: 1px solid #000;
	}

	& .product-image-block {
		display: flex;
		padding-bottom: 45px;
		border-bottom: 1px solid #000;
	}

	& .product-container {
		display: flex;
		flex-direction: column;
	}

	& .product-consise-description {
		display: flex;
		flex-direction: column;
		margin-left: 25px;
		padding: 20px 55px 0 0;
		padding-top: 25px;
		border-top: 1px solid #000;
		gap: 15px;
		width: 100%;
	}
`
