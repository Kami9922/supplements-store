import React from 'react'
import styled from 'styled-components'

const ProductCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	content,
}) => {
	return (
		<div className={className}>
			<img
				alt={imageUrl}
				src={imageUrl}
			/>
			<div>{title}</div>
			<div>{content}</div>
			<div>{publishedAt}</div>
		</div>
	)
}

export const ProductCard = styled(ProductCardContainer)`
	border: 1px solid #000;
	padding: 5px;
`
