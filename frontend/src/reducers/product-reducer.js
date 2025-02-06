import { ACTION_TYPE } from '../actions/action-type'

const initialProductState = {
	id: '',
	title: '',
	category: '',
	cost: '',
	storeAmount: '',
	imageUrl: '',
	info: '',
	publishedAt: '',
}

export const productReducer = (
	state = initialProductState,
	{ type, payload }
) => {
	switch (type) {
		case ACTION_TYPE.SET_PRODUCT_DATA:
			return {
				...state,
				...payload,
			}
		case ACTION_TYPE.RESET_PRODUCT_DATA:
			return {
				...state,
				...initialProductState,
			}

		default:
			return state
	}
}
