export const RegistrationInputs = ({ register }) => {
	return (
		<>
			<input
				type='text'
				placeholder='Логин...'
				{...register('login', {})}
			/>
			<input
				type='password'
				placeholder='Пароль...'
				{...register('password', {})}
			/>
			<input
				type='password'
				placeholder='Проверка пароля...'
				{...register('passcheck', {})}
			/>
		</>
	)
}
