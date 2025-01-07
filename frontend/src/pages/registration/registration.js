import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../components/button/button'
import { Navigate } from 'react-router-dom'
import { H2 } from '../../components/h2/h2'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../actions/set-user'
import { selectUserRole } from '../../selectors/select-user-role'
import { ROLE } from '../../constants/role'
import { AuthFormError } from '../../components/auth-form-error/auth-form-error'
import { useResetForm } from '../../hooks/use-reset-form'
import { request } from '../../utils/request'

const regFormSchema = yup.object().shape({
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
	passcheck: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
})

const RegistrationContainer = ({ className }) => {
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
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	})

	const [serverError, setServerError] = useState(null)

	const roleId = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`)
					return
				}

				dispatch(setUser(user))
				sessionStorage.setItem('userData', JSON.stringify(user))
			}
		)
	}

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message
	const errorMessage = formError || serverError

	if (roleId !== ROLE.GUEST) {
		return <Navigate to='/'></Navigate>
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
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
				<input
					type='password'
					placeholder='Проверка пароля...'
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button
					type='submit'
					disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	)
}

export const Registration = styled(RegistrationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	& > form {
		width: 260px;
		display: flex;
		flex-direction: column;
	}
`
