import { ACTION_TYPE } from '../actions/action-type'

const initialCategoriesState = []

export const categoriesReducer = (
	state = initialCategoriesState,
	{ type, payload }
) => {
	switch (type) {
		case ACTION_TYPE.SET_CATEGORIES:
			return [...payload]

		default:
			return state
	}
}
