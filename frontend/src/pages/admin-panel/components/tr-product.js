import styled from 'styled-components'
import { Icon } from '../../../components/icon/icon'
import { useDispatch } from 'react-redux'
import { removeProductAsync } from '../../../actions/products/async-products-actions/remove-product-async'
import { setIsLoading } from '../../../actions/other/set-is-loading'
import { setProductData } from '../../../actions/products/products-actions/set-product-data'
import { openModal } from '../../../actions/modal/open-modal'
import { editProductAsync } from '../../../actions/products/async-products-actions/edit-product-async'
import { CLOSE_MODAL } from '../../../actions/modal/close-modal'

const TrProductContainer = ({ className, product }) => {
	const dispatch = useDispatch()
	const onRemoveProduct = (id) => {
		dispatch(removeProductAsync(id))
		dispatch(setIsLoading(true, true))
	}

	const onEditProduct = (product) => {
		dispatch(setProductData(product))
		dispatch(
			openModal({
				onConfirm: (id, productData, reset) => {
					dispatch(editProductAsync(id, productData))
					dispatch(CLOSE_MODAL)
					reset()
				},
				isOpen: {
					product: true,
				},
			})
		)
	}
	return (
		<tr className={className}>
			<td className='td-image'>
				<img
					alt={product.imageUrl}
					src={product.imageUrl}
				/>
			</td>
			<td>{product.title}</td>
			<td>{product.category}</td>
			<td>{product.cost + '₽'}</td>
			<td>{product.storeAmount}</td>
			<td className='td-info'>{product.info}</td>
			<td className='td-actions'>
				<Icon
					width='75px'
					className='td-icon'
					background='rgb(209, 209, 209)'
					id='fa-pencil-square-o'
					margin='2px 0px 0px 0px'
					onClick={() => onEditProduct(product)}
				/>
				<Icon
					width='75px'
					className='td-icon'
					background='rgb(247, 68, 68)'
					color='rgb(0, 0, 0)'
					id='fa fa-times'
					margin='2px 0px 0px 0px'
					onClick={() => onRemoveProduct(product.id)}
				/>
			</td>
		</tr>
	)
}

export const TrProduct = styled(TrProductContainer)`
	& .td-actions {
		display: flex;
		flex-direction: column;
		padding: 0 5px;
		border: none;
	}

	& .td-icon {
		border: 1px solid black;
		border-radius: 5px;
		display: flex;
		align-items: center;
		padding: 3px;
		justify-content: center;
	}
`
