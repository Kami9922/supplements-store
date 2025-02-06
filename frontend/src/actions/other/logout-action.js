import { request } from '../../utils/request'
import { ACTION_TYPE } from '../action-type'

export const logoutAction = () => {
	request('/logout', 'POST').catch((error) =>
		console.log('Ошибка при выходе:', error)
	)
	return { type: ACTION_TYPE.LOGOUT }
}
