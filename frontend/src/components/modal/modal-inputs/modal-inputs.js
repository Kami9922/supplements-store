import styled from 'styled-components'
import { ImageInput } from './image-input/image-input'

const ModalInputsContainer = ({
	className,
	title,
	category,
	cost,
	storeAmount,
	info,
	isTypingUrl,
	setTitle,
	setCategory,
	setCost,
	setStoreAmount,
	setImage,
	setInfo,
	setIsTypingUrl,
}) => {
	return (
		<div className={className}>
			<div>
				<span>Название</span>
				<input
					value={title}
					type='text'
					placeholder='Введите название товара'
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>

			<div>
				<span>Категория</span>
				<input
					value={category}
					type='text'
					placeholder='Введите категорию товара'
					onChange={({ target }) => setCategory(target.value)}
				/>
			</div>

			<div>
				<span>Стоимость</span>
				<input
					value={cost}
					type='text'
					placeholder='Введите стоимость товара'
					onChange={({ target }) => setCost(target.value)}
				/>
			</div>

			<div>
				<span>Количество</span>
				<input
					value={storeAmount}
					type='text'
					placeholder='Введите количество товара'
					onChange={({ target }) => setStoreAmount(target.value)}
				/>
			</div>

			<ImageInput
				isTypingUrl={isTypingUrl}
				setImage={setImage}
				setIsTypingUrl={setIsTypingUrl}
			/>

			<div>
				<span>Описание</span>
				<textarea
					value={info}
					placeholder='Введите описание товара'
					onChange={({ target }) => setInfo(target.value)}
				/>
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

	& span {
		display: block;
		font-weight: 500;

		margin-bottom: 10px;
	}

	& h3 {
		margin: 0 0 20px 0;
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
