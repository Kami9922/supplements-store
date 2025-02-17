import { Link } from 'react-router-dom'
import { AuthFormError } from '../../components/auth-form-error/auth-form-error'
import { Button } from '../../components/button/button'

export const AuthButtonAndLink = ({ errorMessage, formError }) => {
	return (
		<>
			<Button
				height='40px'
				type='submit'
				disabled={!!formError}>
				Авторизоваться
			</Button>
			{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			<Link
				className='to-register-link'
				to='/register'>
				Регистрация
			</Link>
		</>
	)
}
