export const AuthInputs = ({ register }) => {
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
		</>
	)
}
