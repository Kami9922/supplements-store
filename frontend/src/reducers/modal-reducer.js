import { ACTION_TYPE } from '../actions/action-type'

const initialModalState = {
	modal: {
		onConfirm: () => {},
		isOpen: {
			alertCart: false,
			product: false,
			alertOnBuy: false,
		},
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
				},
			}
		case ACTION_TYPE.CLOSE_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					onConfirm: () => {},
					isOpen: {
						alertCart: false,
						product: false,
						alertOnBuy: false,
					},
				},
			}
		default:
			return state
	}
}
