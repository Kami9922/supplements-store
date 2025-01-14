import { ACTION_TYPE } from '../actions/action-type'

const initialAppState = {
	wasLogout: false,
}

export const appReducer = (state = initialAppState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			}

		default:
			return state
	}
}
