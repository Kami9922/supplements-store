import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ProductCardContainer = ({ className, id, title, imageUrl, cost }) => {
	return (
		<div className={className}>
			<Link
				className='product-card-container'
				to={`/product/${id}`}>
				<img
					alt={imageUrl}
					src={imageUrl}
				/>
				<span className='card-title'>{title}</span>
				<span className='card-cost'>{cost}</span>
			</Link>
		</div>
	)
}

export const ProductCard = styled(ProductCardContainer)`
	& .product-card-container {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		width: 280px;
		margin: 20px;
		border: 1px solid #000;
		border-radius: 15px;
		padding: 10px;
	}
	& .card-title {
		padding: 5px 5px 0px;
	}
	& .card-cost {
		padding: 0px 5px 5px;
	}
`
