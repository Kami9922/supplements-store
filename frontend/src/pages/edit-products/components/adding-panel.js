import React from 'react'
import styled from 'styled-components'
import { Icon } from '../../../components/icon/icon'
import { openModal } from '../../../actions/modal/open-modal'
import { useDispatch } from 'react-redux'
import { CLOSE_MODAL } from '../../../actions/modal/close-modal'
import { addProductAsync } from '../../../actions/products/async-products-actions/add-product-async'
import { RESET_PRODUCT_DATA } from '../../../actions/products/products-actions/reset-product-data'

const AddingPanelContainer = ({ className }) => {
	const dispatch = useDispatch()

	const onAddProduct = () => {
		dispatch(RESET_PRODUCT_DATA)
		dispatch(
			openModal({
				onConfirm: (id = null, product, reset) => {
					dispatch(addProductAsync(product))
					dispatch(CLOSE_MODAL)
					reset()
				},
				isOpen: {
					product: true,
					cart: false,
				},
			})
		)
	}

	return (
		<div className={className}>
			<Icon
				className='add-product-icon'
				size='42px'
				id='fa-plus-square-o'
				margin='0px 0px 10px 0px'
				color='rgb(32 153 25)'
				transActive={true}
				onClick={onAddProduct}
			/>
		</div>
	)
}

export const AddingPanel = styled(AddingPanelContainer)`
	.add-product-icon {
		display: flex;
		justify-self: center;
		width: 32px;
	}
`
