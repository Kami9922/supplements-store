import { ACTION_TYPE } from '../actions/action-type'
import { updateProductInArray } from '../utils/update-product-in-array'

const initialProductsState = {
	products: [],
	allProducts: [],
	lastPage: 1,
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
		case ACTION_TYPE.SET_ALL_PRODUCTS:
			return {
				...state,
				allProducts: [...payload],
			}
		case ACTION_TYPE.ADD_PRODUCT:
			return {
				...state,
				products: [...state.products, payload],
			}
		case ACTION_TYPE.EDIT_PRODUCT:
			const updatedProducts = updateProductInArray(state.products, payload)

			return {
				...state,
				products: updatedProducts,
			}
		case ACTION_TYPE.REMOVE_PRODUCT:
			return {
				...state,
				products: state.products.filter((product) => product.id !== payload),
			}
		case ACTION_TYPE.SET_LAST_PAGE:
			return {
				...state,
				lastPage: payload,
			}
		default:
			return state
	}
}
