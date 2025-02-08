import styled from 'styled-components'
import { ImageInput } from './image-input/image-input'

const ModalInputsContainer = ({
	className,
	isTypingUrl,
	setTitle,
	setCategory,
	setCost,
	setStoreAmount,
	setImage,
	setInfo,
	setIsTypingUrl,
	register,
	errors,
}) => {
	return (
		<div className={className}>
			<div>
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

			<div>
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

			<div>
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

			<div>
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

			<ImageInput
				isTypingUrl={isTypingUrl}
				setImage={setImage}
				setIsTypingUrl={setIsTypingUrl}
			/>

			<div>
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
		</div>
	)
}
export const ModalInputs = styled(ModalInputsContainer)`
	display: flex;
	flex-direction: column;
	gap: 5px;
	margin-bottom: 20px;

	& input {
		padding: 10px;
		width: 300px;
		border: 1px solid rgb(139, 139, 139);
		border-radius: 10px;
	}

	& .heading-span {
		display: block;
		font-weight: 600;
		margin-bottom: 10px;
		font-size: 20px;
		margin-bottom: 15px;
	}

	& .error-span {
		padding-top: 5px;
		font-size: 12px;
		color: rgb(236, 32, 32);
	}

	& textarea {
		resize: none;
		padding: 10px;
		width: 300px;
		border: 1px solid rgb(139, 139, 139);
		border-radius: 10px;
	}

	& .modal-inputs {
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin-bottom: 20px;
	}
`
