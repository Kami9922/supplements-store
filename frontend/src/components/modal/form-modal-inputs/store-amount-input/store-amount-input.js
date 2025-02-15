import styled from 'styled-components'

const StoreAmountInputContainer = ({
	className,
	register,
	setStoreAmount,
	errors,
}) => {
	return (
		<div className={className}>
			<span className='heading-span'>Количество</span>
			<input
				{...register('formStoreAmount', {})}
				type='number'
				placeholder='Введите количество товара'
				onChange={({ target }) => setStoreAmount(target.value)}
			/>
			{errors.formStoreAmount && (
				<span className='error-span'>{errors.formStoreAmount.message}</span>
			)}
		</div>
	)
}

export const StoreAmountInput = styled(StoreAmountInputContainer)``
