import React from 'react'
import styled from 'styled-components'
import { ProductsTable } from './components/products-table'

export const EditProductsContainer = ({ className }) => {
	return (
		<div className={className}>
			<ProductsTable />
		</div>
	)
}

export const EditProducts = styled(EditProductsContainer)`
	padding-top: 10px;
`
