import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../components/button/button'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../actions/other/set-user'
import { selectUserRole } from '../../selectors/user-selectors/select-user-role'
import { ROLE } from '../../constants/role'
import { AuthFormError } from '../../components/auth-form-error/auth-form-error'
import { useResetForm } from '../../hooks/use-reset-form'
import { request } from '../../utils/request'

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(3, 'Неверный логин. Минимум 3 символа')
		.max(15, 'Неверный логин. Максмиум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверный пароль. Допускаются  буквы, цифры и знаки % #'
		)
		.min(6, 'Неверный пароль. Минимум 6 символов')
		.max(30, 'Неверный пароль. Максиум 30 символов'),
})

const AuthorizationContainer = ({ className }) => {
	const dispatch = useDispatch()

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	const [serverError, setServerError] = useState(null)

	const roleId = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`)
				return
			}

			dispatch(setUser(user))
			sessionStorage.setItem('userData', JSON.stringify(user))
		})
	}

	const formError = errors?.login?.message || errors?.password?.message
	const errorMessage = formError || serverError

	if (roleId !== ROLE.GUEST) {
		return <Navigate to='/'></Navigate>
	}

	return (
		<div className={className}>
			<h2>Авторизация</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type='text'
					placeholder='Логин...'
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<input
					type='password'
					placeholder='Пароль...'
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
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
			</form>
		</div>
	)
}

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& input {
		padding: 10px;
		border-radius: 10px;
		border: 1px solid black;
		font-size: 14px;
	}

	& > h2 {
		font-size: 30px;
		padding-top: 150px;
		margin: 0 0 30px 0;
	}

	& > form {
		width: 320px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	& .to-register-link {
		color: rgb(179, 179, 179);
		text-decoration: underline;
		text-align: center;
		transition: color 0.3s;
	}
	& .to-register-link:hover {
		color: rgb(146, 146, 146);
	}
`
