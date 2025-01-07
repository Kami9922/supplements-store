import { ACTION_TYPE } from '../actions/action-type'

const initialAppState = {
	wasLogout: false,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
	products: [],
}

export const appReducer = (state = initialAppState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_PRODUCTS:
			console.log(payload)

			return {
				...state,
				products: [...payload],
			}
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			}
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...payload,
					isOpen: true,
				},
			}
		case ACTION_TYPE.CLOSE_MODAL:
			return initialAppState
		default:
			return state
	}
}
