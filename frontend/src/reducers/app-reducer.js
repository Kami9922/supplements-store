import { ACTION_TYPE } from '../actions/action-type'

const initialAppState = {
	wasLogout: false,
	isLoading: {
		status: false,
		loader: false,
	},
}

export const appReducer = (state = initialAppState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			}
		case ACTION_TYPE.SET_IS_LOADING:
			return {
				...state,
				isLoading: payload,
			}

		default:
			return state
	}
}
