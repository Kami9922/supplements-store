import React from 'react'
import styled from 'styled-components'
import { Icon } from '../../../components/icon/icon'
import { openModal } from '../../../actions/open-modal'
import { useDispatch } from 'react-redux'
import { CLOSE_MODAL } from '../../../actions/close-modal'
import { addProductAsync } from '../../../actions/add-product-async'

const AddingPanelContainer = ({ className }) => {
	const dispatch = useDispatch()

	const onAddProduct = () => {
		dispatch(
			openModal({
				onConfirm: (id = null, product, reset) => {
					dispatch(addProductAsync(product))
					dispatch(CLOSE_MODAL)
					reset()
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
