import React from 'react'
import styled from 'styled-components'

const ProductCardContainer = ({ className, id, title, imageUrl, cost }) => {
	return (
		<div className={className}>
			<img
				alt={imageUrl}
				src={imageUrl}
			/>
			<span className='card-title'>{title}</span>
			<span className='card-cost'>{cost}</span>
		</div>
	)
}

export const ProductCard = styled(ProductCardContainer)`
	display: flex;
	flex-direction: column;
	width: 280px;
	margin: 20px;
	border: 1px solid #000;

	& .card-title {
		padding: 5px 5px 0px;
	}
	& .card-cost {
		padding: 0px 5px 5px;
	}
`
