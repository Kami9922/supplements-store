import styled from 'styled-components'
import { Icon } from '../../../icon/icon'

const ImageInputContainer = ({
	className,
	isTypingUrl,
	setImage,
	setIsTypingUrl,
}) => {
	const handleImageChange = (target) => {
		const selectedFile = target.files[0]
		setImage(selectedFile)
	}

	return (
		<div className={className}>
			<span>Изображение</span>
			<div className='image-typing-choice'>
				<Icon
					className='change-typing-image-icon'
					transActive={true}
					id='fa-pencil'
					margin='10px 0px 0px 16px'
					onClick={() => setIsTypingUrl(!isTypingUrl)}
				/>
				{!isTypingUrl ? (
					<label className='image-choice-label'>
						Загрузить изображение
						<input
							className='image-choice'
							type='file'
							onChange={({ target }) => handleImageChange(target)}
						/>
					</label>
				) : (
					<input
						className='typing-image-url'
						type='text'
						placeholder='Введите URL изображения товара'
						onChange={({ target }) => setImage(target.value)}
					/>
				)}
			</div>
		</div>
	)
}
export const ImageInput = styled(ImageInputContainer)`
	& .image-choice {
		display: none;
	}
	& .image-typing-choice {
		position: relative;
		margin-bottom: 5px;
	}
	& .change-typing-image-icon {
		position: absolute;
		right: 24px;
		top: -10px;
	}

	& .image-choice-label {
		display: inline-block;
		padding: 5px 15px;
		background-color: rgb(184, 166, 68);
		color: white;
		border: none;
		border-radius: 5px;
		font-weight: 500;
		font-size: 18px;
	}

	.image-choice-label:hover {
		box-shadow: inset 1px 1px 50px 1px rgba(255, 255, 255, 0.2);
		transform: translate(0, -1px);
	}
	& .typing-image-url {
		padding-right: 30px;
	}
`
