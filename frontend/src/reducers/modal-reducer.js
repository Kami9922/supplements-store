import { ACTION_TYPE } from '../actions/action-type'

const initialModalState = {
	modal: {
		onConfirm: () => {},
		isOpen: false,
	},
}

export const modalReducer = (state = initialModalState, { type, payload }) => {
	switch (type) {
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
			return {
				...state,
				modal: {
					...state.modal,
					onConfirm: () => {},
					isOpen: false,
				},
			}
		default:
			return state
	}
}
