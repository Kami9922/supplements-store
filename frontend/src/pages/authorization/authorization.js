import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import styled from 'styled-components'
import { Navigate } from 'react-router-dom'
import { selectUserRole } from '../../selectors/user-selectors/select-user-role'
import { ROLE } from '../../constants/role'
import { useResetForm } from '../../hooks/use-reset-form'
import { AuthInputs } from './auth-inputs'
import { AuthButtonAndLink } from './auth-buttons-and-link'
import { loginOrRegisterAsync } from '../../actions/other/login-or-register-async'
import { useDispatch, useSelector } from 'react-redux'

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

	const roleId = useSelector(selectUserRole)

	const dispatch = useDispatch()

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		dispatch(loginOrRegisterAsync(login, password, 'auth'))
	}

	const formError = errors?.login?.message || errors?.password?.message
	const errorMessage = formError

	if (roleId !== ROLE.GUEST) {
		return <Navigate to='/'></Navigate>
	}

	return (
		<div className={className}>
			<h2>Авторизация</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<AuthInputs register={register} />
				<AuthButtonAndLink
					errorMessage={errorMessage}
					formError={formError}
				/>
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
