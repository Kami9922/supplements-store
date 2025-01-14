import styled from 'styled-components'
import { Button } from '../button/button'
import { useDispatch, useSelector } from 'react-redux'
import { selectModalIsOpen } from '../../selectors/modal-selectors/select-modal-is-open'
import { useState } from 'react'
import { CLOSE_MODAL } from '../../actions/close-modal'
import { selectModalOnConfirm } from '../../selectors/modal-selectors/select-modal-on-confirm'
import { editProductIdSelector } from '../../selectors/modal-selectors/edit-product-id-selector'

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen)
	const onConfirm = useSelector(selectModalOnConfirm)
	const editProductId = useSelector(editProductIdSelector)

	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [category, setCategory] = useState('')
	const [cost, setCost] = useState('')
	const [amount, setAmount] = useState('')
	const [imageUrl, setImageUrl] = useState('')

	const resetInputs = () => {
		setTitle('')
		setCategory('')
		setCost('')
		setAmount('')
		setImageUrl('')
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
							placeholder='Введите название товара'
							onChange={({ target }) => setTitle(target.value)}
						/>
					</div>
					<div>
						<span>Категория</span>
						<input
							value={category}
							placeholder='Введите категорию товара'
							onChange={({ target }) => setCategory(target.value)}
						/>
					</div>
					<div>
						<span>Стоимость</span>
						<input
							value={cost}
							placeholder='Введите стоимость товара'
							onChange={({ target }) => setCost(target.value)}
						/>
					</div>
					<div>
						<span>Количество</span>
						<input
							value={amount}
							placeholder='Введите количество товара'
							onChange={({ target }) => setAmount(target.value)}
						/>
					</div>
					<div>
						<span>Изображение</span>
						<input
							value={imageUrl}
							placeholder='Введите url картинки товара'
							onChange={({ target }) => setImageUrl(target.value)}
						/>
					</div>
				</div>
				<div className='buttons'>
					<Button
						width='120px'
						onClick={() =>
							onConfirm(
								editProductId,
								{
									title,
									category,
									cost,
									amount,
									imageUrl,
								},
								resetInputs
							)
						}>
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

	& input {
		padding: 10px;
		width: 300px;
	}

	& span {
		display: block;
		font-weight: 500;
		margin-bottom: 5px;
	}

	& h3 {
		margin: 0 0 20px 0;
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
