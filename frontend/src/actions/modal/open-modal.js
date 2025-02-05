import { ACTION_TYPE } from '../action-type'

export const openModal = (params) => ({
	type: ACTION_TYPE.OPEN_MODAL,
	payload: params,
})
