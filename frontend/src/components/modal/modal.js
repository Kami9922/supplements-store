import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { selectModalIsOpen } from '../../selectors/modal-selectors/select-modal-is-open'
import { selectModalOnConfirm } from '../../selectors/modal-selectors/select-modal-on-confirm'
import { productSelector } from '../../selectors/product-selectors/product-selector'
import { useEffect, useState } from 'react'
import { CLOSE_MODAL } from '../../actions/close-modal'
import { Button } from '../button/button'
import { Icon } from '../icon/icon'

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen)
	const onConfirm = useSelector(selectModalOnConfirm)
	const product = useSelector(productSelector)

	const dispatch = useDispatch()

	const [title, setTitle] = useState(product.title)
	const [category, setCategory] = useState(product.category)
	const [cost, setCost] = useState(product.cost)
	const [storeAmount, setStoreAmount] = useState(product.storeAmount)
	const [image, setImage] = useState(null)
	const [info, setInfo] = useState(product.info)
	const [isTypingUrl, setIsTypingUrl] = useState(false)

	useEffect(() => {
		if (product) {
			setTitle(product.title)
			setCategory(product.category)
			setCost(product.cost)
			setStoreAmount(product.storeAmount)
			setInfo(product.info)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product])

	const resetInputs = () => {
		setTitle('')
		setCategory('')
		setCost('')
		setStoreAmount('')
		setImage(null)
		setInfo('')
		setIsTypingUrl(false)
	}
	const handleImageChange = (target) => {
		const selectedFile = target.files[0]
		setImage(selectedFile)
	}

	const handleSubmit = () => {
		const formData = new FormData()
		formData.append('title', title)
		formData.append('category', category)
		formData.append('cost', cost)
		formData.append('storeAmount', storeAmount)

		formData.append('image', image)

		formData.append('info', info)

		onConfirm(product.id, formData, resetInputs)
	}

	const onCancel = () => {
		dispatch(CLOSE_MODAL)
		resetInputs()
	}

	if (!isOpen) {
		return null
	}

	return (
		<div className={className}>
			<div className='overlay'></div>
			<div className='box'>
				<h3>Добавление товара</h3>
				<div className='modal-inputs'>
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
					<div className='image-choice-div'>
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

					<div>
						<span>Описание</span>
						<textarea
							value={info}
							placeholder='Введите описание товара'
							onChange={({ target }) => setInfo(target.value)}
						/>
					</div>
				</div>
				<div className='buttons'>
					<Button
						width='120px'
						type='submit'
						onClick={handleSubmit}>
						Сохранить
					</Button>
					<Button
						width='120px'
						onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	)
}

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

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

	& input {
		padding: 10px;
		width: 300px;
		border: 1px solid rgb(139, 139, 139);
		border-radius: 10px;
	}
	& .image-choice {
		display: none;
	}

	& .typing-image-url {
		padding-right: 30px;
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

	& .overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.7);
		height: 100%;
		width: 100%;
	}

	& .box {
		position: relative;
		top: 50%;
		transform: translate(0, -50%);
		width: 400px;
		margin: 0 auto;
		padding: 30px;
		background-color: #fff;
		/* border: 1px solid #000; */
		border-radius: 15px;
		z-index: 30;
		text-align: center;
	}

	& .buttons {
		display: flex;
		justify-content: center;
		gap: 15px;
	}
	& .buttons button {
		border-radius: 5px;
	}
`
