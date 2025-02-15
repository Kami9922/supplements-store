import styled from 'styled-components'

const TitleInputContainer = ({ className, register, setTitle, errors }) => {
	return (
		<div className={className}>
			<span className='heading-span'>Название</span>
			<input
				{...register('formTitle', {})}
				type='text'
				placeholder='Введите название товара'
				onChange={({ target }) => setTitle(target.value)}
			/>
			{errors.formTitle && (
				<span className='error-span'>{errors.formTitle.message}</span>
			)}
		</div>
	)
}

export const TitleInput = styled(TitleInputContainer)``
