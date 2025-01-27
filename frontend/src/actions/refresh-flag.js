import { ACTION_TYPE } from './action-type'

export const refreshFlag = (flag) => ({
	type: ACTION_TYPE.REFRESH_FLAG,
	payload: flag,
})
