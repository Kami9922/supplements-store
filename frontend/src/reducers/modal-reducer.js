import { ACTION_TYPE } from '../actions/action-type'

const initialModalState = {
	modal: {
		editProductId: null,
		onConfirm: () => {},
		isOpen: false,
	},
}

export const modalReducer = (state = initialModalState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.OPEN_MODAL:
			console.log(payload)

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
					editProductId: null,
					onConfirm: () => {},
					isOpen: false,
				},
			}
		default:
			return state
	}
}
