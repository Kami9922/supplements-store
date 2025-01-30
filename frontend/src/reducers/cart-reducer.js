import { ACTION_TYPE } from '../actions/action-type'
import { updateProductInArray } from '../utils/update-product-in-array'

const initialCartState = {
	cartProducts: [],
}

export const cartReducer = (state = initialCartState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_CART_PRODUCTS:
			return {
				...state,
				cartProducts: [...payload],
			}
		case ACTION_TYPE.REMOVE_CART_PRODUCT:
			return {
				...state,
				cartProducts: state.cartProducts.filter(
					(cartProduct) => cartProduct.id !== payload
				),
			}
		case ACTION_TYPE.EDIT_CART_PRODUCT:
			const updatedProducts = updateProductInArray(
				state.cartProducts,
				payload,
				true
			)

			return {
				...state,
				cartProducts: updatedProducts,
			}
		case ACTION_TYPE.ADD_CART_PRODUCT: {
			return {
				...state,
				cartProducts: [payload, ...state.cartProducts],
			}
		}

		default:
			return state
	}
}
