import styled from 'styled-components'

const CostInputContainer = ({ className, register, setCost, errors }) => {
	return (
		<div className={className}>
			<span className='heading-span'>Стоимость</span>
			<input
				{...register('formCost', {})}
				type='number'
				placeholder='Введите стоимость товара'
				onChange={({ target }) => setCost(target.value)}
			/>
			{errors.formCost && (
				<span className='error-span'>{errors.formCost.message}</span>
			)}
		</div>
	)
}

export const CostInput = styled(CostInputContainer)``
