import { ACTION_TYPE } from '../actions/action-type'

const initialProductsState = {
	products: [],
}

export const productsReducer = (
	state = initialProductsState,
	{ type, payload }
) => {
	switch (type) {
		case ACTION_TYPE.SET_PRODUCTS:
			return {
				...state,
				products: [...payload],
			}
		case ACTION_TYPE.REMOVE_PRODUCT:
			return {
				...state,
				products: state.products.filter((product) => product.id !== payload),
			}
		case ACTION_TYPE.ADD_PRODUCT:
			console.log(payload)

			return {
				...state,
				products: [...state.products, payload],
			}
		default:
			return state
	}
}