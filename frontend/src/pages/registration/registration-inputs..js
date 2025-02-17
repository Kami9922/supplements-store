export const RegistrationInputs = ({ register, setServerError }) => {
	return (
		<>
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
		</>
	)
}
