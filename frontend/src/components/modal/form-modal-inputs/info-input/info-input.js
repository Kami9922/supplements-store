import styled from 'styled-components'

const InfoInputContainer = ({ className, register, setInfo, errors }) => {
	return (
		<div className={className}>
			<span className='heading-span'>Описание</span>
			<textarea
				{...register('formInfo', {})}
				placeholder='Введите описание товара'
				onChange={({ target }) => setInfo(target.value)}
			/>
			{errors.formInfo && (
				<span className='error-span'>{errors.formInfo.message}</span>
			)}
		</div>
	)
}

export const InfoInput = styled(InfoInputContainer)``
