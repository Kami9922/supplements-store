import { ACTION_TYPE } from '../action-type'

export const setIsLoading = (status, loader, locatedLoaderId) => ({
	type: ACTION_TYPE.SET_IS_LOADING,
	payload: {
		status,
		loader,
		locatedLoaderId,
	},
})
