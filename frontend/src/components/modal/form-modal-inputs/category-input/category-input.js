import styled from 'styled-components'

const CategoryInputContainer = ({
	className,
	register,
	setCategory,
	errors,
}) => {
	return (
		<div className={className}>
			<span className='heading-span'>Категория</span>
			<input
				{...register('formCategory', {})}
				type='text'
				placeholder='Введите категорию товара'
				onChange={({ target }) => setCategory(target.value)}
			/>
			{errors.formCategory && (
				<span className='error-span'>{errors.formCategory.message}</span>
			)}
		</div>
	)
}

export const CategoryInput = styled(CategoryInputContainer)``
