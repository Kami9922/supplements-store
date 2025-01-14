import { ACTION_TYPE } from '../actions/action-type'

const initialProductState = {
	id: '',
	title: '',
	category: '',
	cost: '',
	amount: '',
	imageUrl: '',
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

		default:
			return state
	}
}
