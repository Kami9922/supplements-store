import { ACTION_TYPE } from '../action-type'

export const setErrorMessage = (errorMessage) => ({
	type: ACTION_TYPE.SET_ERROR_MESSAGE,
	payload: errorMessage,
})
