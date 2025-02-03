import { addCartProductAsync } from '../actions/add-cart-product-async'
import { editCartProductAsync } from '../actions/edit-cart-product-async'
import { setIsLoading } from '../actions/set-is-loading'

export const onAddCartProduct = (dispatch, cartProducts, title, id) => {
	const existingProductIndex = cartProducts.findIndex(
		(cartProduct) => cartProduct.title === title
	)
	dispatch(setIsLoading(true, false))

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
