import React from 'react'
import styled from 'styled-components'
import { ProductsTable } from './components/products-table'
import { PrivateContent } from '../../components/private-content/private-content'
import { ROLE } from '../../constants/role'

export const EditProductsContainer = ({ className }) => {
	return (
		<div className={className}>
			<PrivateContent access={[ROLE.MODERATOR, ROLE.ADMIN]}>
				<ProductsTable />
			</PrivateContent>
		</div>
	)
}

export const EditProducts = styled(EditProductsContainer)`
	padding-top: 10px;
`
