import { addCartProductAsync } from '../actions/cart-products/async-cart-product-actions/add-cart-product-async'
import { editCartProductAsync } from '../actions/cart-products/async-cart-product-actions/edit-cart-product-async'
import { openModal } from '../actions/modal/open-modal'
import { setIsLoading } from '../actions/other/set-is-loading'
import { ROLE } from '../constants/role'

export const onAddCartProduct = (
	dispatch,
	userRole,
	cartProducts,
	title,
	id
) => {
	if (userRole === ROLE.GUEST) {
		dispatch(
			openModal({
				isOpen: {
					alertCart: true,
				},
			})
		)
		return
	}

	const existingProductIndex = cartProducts.findIndex(
		(cartProduct) => cartProduct.title === title
	)
	dispatch(setIsLoading(true, false, id))

	if (existingProductIndex >= 0) {
		const existingProduct = cartProducts[existingProductIndex]

		const { id: cartProductId, quantity: cartProductQuantity } = existingProduct

		dispatch(
			editCartProductAsync(cartProductId, cartProductQuantity, 'increase')
		)
	} else {
		dispatch(addCartProductAsync(id))
	}
}
