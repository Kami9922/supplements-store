import { request } from '../../utils/request'
import { setErrorMessage } from './set-error-message'
import { setUser } from './set-user'

export const loginOrRegisterAsync =
	(login, password, pageFlag) => (dispatch) => {
		const path = pageFlag === 'auth' ? '/login' : '/register'

		request(path, 'POST', { login, password })
			.then(({ user }) => {
				dispatch(setUser(user))
				sessionStorage.setItem('userData', JSON.stringify(user))
			})
			.catch((error) => {
				console.error(error.message)
				dispatch(
					setErrorMessage(
						pageFlag === 'auth'
							? 'Ошибка при авторизации'
							: 'Ошибка при регистриации'
					)
				)
			})
	}
