import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '../../components/button/button'
import { loadProductAsync } from '../../actions/load-product-async'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productSelector } from '../../selectors/product-selectors/product-selector'
import { setIsLoading } from '../../actions/set-is-loading'
import { Loader } from '../../components/loader/loader'
import { isLoadingSelector } from '../../selectors/app-selectors/is-loading-selector'

const ProductContainer = ({ className }) => {
	const product = useSelector(productSelector)
	const isLoading = useSelector(isLoadingSelector)
	const params = useParams()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadProductAsync(params.id))
		dispatch(setIsLoading(true))
	}, [params.id, dispatch])

	return (
		<div className={className}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div>
						<div className='product-container'>
							<div className='product-image-block'>
								<img
									alt={product.imageUrl}
									src={product.imageUrl}
								/>
								<div className='product-consise-description'>
									<span className='declarative-span'>О товаре</span>
									<div>
										<span className='bold-span'>{product.title}</span>
									</div>
									<div className='description-span'>
										<span className='bold-span'>Осталось в магазине: </span>
										<span>{product.amount + ' ед.'}</span>
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
						<Button width='250px'>Купить</Button>
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

	& .declarative-span {
		font-weight: bold;
		font-size: 25px;
	}

	& p {
		padding-left: 15px;
	}

	& img {
		width: 450px;
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

	& .product-info {
	}

	& .product-image-block {
		display: flex;
		padding-bottom: 45px;
		border-bottom: 1px solid #000;
		/* justify-content: space-between; */
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
		/* justify-content: center; */
		border-top: 1px solid #000;
		gap: 15px;
		width: 100%;
	}
`
