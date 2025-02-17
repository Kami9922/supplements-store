import React, { useEffect } from 'react'
import styled from 'styled-components'

import { loadProductAsync } from '../../actions/products/async-products-actions/load-product-async'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productSelector } from '../../selectors/product-selectors/product-selector'
import { setIsLoading } from '../../actions/other/set-is-loading'
import { Loader } from '../../components/loader/loader'
import { isLoadingSelector } from '../../selectors/app-selectors/is-loading-selector'

import { ProductButton } from './product-button/product-button'
import { checkUrlAndDisplayImg } from '../../utils/check-url-and-display-img'
import { ProductConsiceDescription } from './product-consice-description/product-consice-description'

const ProductContainer = ({ className }) => {
	const product = useSelector(productSelector)
	const isLoading = useSelector(isLoadingSelector)

	const params = useParams()

	const dispatch = useDispatch()

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
									src={checkUrlAndDisplayImg(product.imageUrl)}
								/>

								<ProductConsiceDescription product={product} />
							</div>
							<div className='product-info'>
								<h3>Описание: </h3>
								<p>{product.info}</p>
							</div>
						</div>
					</div>
					<ProductButton product={product} />
				</>
			)}
		</div>
	)
}

export const Product = styled(ProductContainer)`
	padding: 40px 40px;
	display: flex;
	flex-direction: column;
	min-height: 72vh;
	justify-content: space-between;
	font-family: Comfortaa;

	& .product-image-block > img {
		width: 350px;
		height: 250px;
		border-radius: 10px;
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
`
