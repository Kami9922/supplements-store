import { ACTION_TYPE } from '../actions/action-type'

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
			const setQuantity = () => {
				const productIndex = state.cartProducts.findIndex(
					(item) => item.id === payload.id
				)

				const updatedProducts = state.cartProducts.map((product, index) => {
					if (index === productIndex) {
						return {
							...product,
							quantity: payload.quantity,
						}
					}
					return product
				})

				return updatedProducts
			}

			return {
				...state,
				cartProducts: setQuantity(),
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
