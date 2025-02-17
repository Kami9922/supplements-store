import styled from 'styled-components'
import { Button } from '../../../components/button/button'
import { onAddCartProduct } from '../../../utils/on-add-cart-product'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserRole } from '../../../selectors/user-selectors/select-user-role'
import { cartProductsSelector } from '../../../selectors/cart-selectors/cart-products-selector'
import { isLoadingSelector } from '../../../selectors/app-selectors/is-loading-selector'
import { setIsLoading } from '../../../actions/other/set-is-loading'
import { editCartProductAsync } from '../../../actions/cart-products/async-cart-product-actions/edit-cart-product-async'

const CartQuantityButtonsContainer = ({
	className,
	onRemoveCartProduct,
	cartProduct,
}) => {
	const cartProducts = useSelector(cartProductsSelector)
	const userRole = useSelector(selectUserRole)
	const isLoading = useSelector(isLoadingSelector)

	const dispatch = useDispatch()

	const onReduceCartProduct = (id, quantity) => {
		if (quantity <= 1) {
			onRemoveCartProduct(id)
			return
		}
		dispatch(setIsLoading(true, false, id))
		dispatch(editCartProductAsync(id, quantity, 'reduce'))
	}

	return (
		<div className={className}>
			<Button
				background='rgb(201, 165, 89)'
				width='30px'
				disabled={isLoading.status}
				onClick={() =>
					onAddCartProduct(
						dispatch,
						userRole,
						cartProducts,
						cartProduct.title,
						cartProduct.id
					)
				}>
				+
			</Button>
			<Button
				background='rgb(201, 165, 89)'
				width='30px'
				disabled={isLoading.status}
				onClick={() =>
					onReduceCartProduct(cartProduct.id, cartProduct.quantity)
				}>
				-
			</Button>
		</div>
	)
}

export const CartQuantityButtons = styled(CartQuantityButtonsContainer)`
	display: flex;
	gap: 5px;
`
