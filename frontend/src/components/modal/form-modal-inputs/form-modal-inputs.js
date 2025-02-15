import styled from 'styled-components'
import { ImageInput } from './image-input/image-input'
import { TitleInput } from './title-input/title-input'
import { CategoryInput } from './category-input/category-input'
import { CostInput } from './cost-input/cost-input'
import { StoreAmountInput } from './store-amount-input/store-amount-input'
import { InfoInput } from './info-input/info-input'

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
			<TitleInput
				setTitle={setTitle}
				register={register}
				errors={errors}
			/>
			<CategoryInput
				setCategory={setCategory}
				register={register}
				errors={errors}
			/>
			<CostInput
				setCost={setCost}
				register={register}
				errors={errors}
			/>
			<StoreAmountInput
				setStoreAmount={setStoreAmount}
				register={register}
				errors={errors}
			/>
			<ImageInput
				register={register}
				isTypingUrl={isTypingUrl}
				setImage={setImage}
				setIsTypingUrl={setIsTypingUrl}
				errors={errors}
			/>
			<InfoInput
				setInfo={setInfo}
				register={register}
				errors={errors}
			/>
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
