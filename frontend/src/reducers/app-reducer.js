import { ACTION_TYPE } from '../actions/action-type'

const initialAppState = {
	wasLogout: false,
	errorMessage: '',
	isLoading: {
		status: false,
		loader: false,
		locatedLoader: false,
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
		case ACTION_TYPE.SET_ERROR_MESSAGE:
			return {
				...state,
				errorMessage: payload,
			}

		default:
			return state
	}
}
