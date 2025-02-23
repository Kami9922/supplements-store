import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import styled from 'styled-components'
import { Button } from '../../components/button/button'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors/user-selectors/select-user-role'
import { ROLE } from '../../constants/role'
import { AuthFormError } from '../../components/auth-form-error/auth-form-error'
import { useResetForm } from '../../hooks/use-reset-form'
import { RegistrationInputs } from './registration-inputs.'
import { loginOrRegisterAsync } from '../../actions/other/login-or-register-async'

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

	const dispatch = useDispatch()

	const roleId = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		dispatch(loginOrRegisterAsync(login, password, 'reg'))
	}

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message
	const errorMessage = formError

	if (roleId !== ROLE.GUEST) {
		return <Navigate to='/'></Navigate>
	}

	return (
		<div className={className}>
			<h2>Регистрация</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<RegistrationInputs register={register} />
				<Button
					height='40px'
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
		width: 320px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	& > h2 {
		font-size: 30px;
		padding-top: 150px;
		margin: 0 0 30px 0;
	}

	& input {
		padding: 10px;
		border-radius: 10px;
		border: 1px solid black;
		font-size: 14px;
	}
`
