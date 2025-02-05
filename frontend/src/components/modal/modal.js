import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { selectModalIsOpen } from '../../selectors/modal-selectors/select-modal-is-open'
import { selectModalOnConfirm } from '../../selectors/modal-selectors/select-modal-on-confirm'
import { productSelector } from '../../selectors/product-selectors/product-selector'
import { useEffect, useState } from 'react'
import { CLOSE_MODAL } from '../../actions/modal/close-modal'
import { ModalInputs } from './modal-inputs/modal-inputs'
import { ModalButtons } from './modal-buttons/modal-buttons'

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
			setImage(product.imageUrl)
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

	const checkToOpen = () => {
		const isTrueValue = Object.values(isOpen).some((value) => value === true)
		return isTrueValue
	}

	if (!checkToOpen()) {
		return null
	}

	return (
		<div className={className}>
			<div className='overlay'></div>
			<div className='box'>
				{!isOpen.cart ? (
					<>
						<h3>Добавление товара</h3>
						<ModalInputs
							title={title}
							category={category}
							cost={cost}
							storeAmount={storeAmount}
							info={info}
							isTypingUrl={isTypingUrl}
							setTitle={setTitle}
							setCategory={setCategory}
							setCost={setCost}
							setStoreAmount={setStoreAmount}
							setImage={setImage}
							setInfo={setInfo}
							setIsTypingUrl={setIsTypingUrl}
						/>
					</>
				) : (
					<div className='cart-warning-modal'>
						<span>Корзина доступна только авторизованным пользователям!</span>
					</div>
				)}
				<ModalButtons
					handleSubmit={handleSubmit}
					onCancel={onCancel}
				/>
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

	& .cart-warning-modal {
		margin-bottom: 20px;
	}

	& span {
		display: block;
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 8px;
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
		border-radius: 15px;
		z-index: 30;
		text-align: center;
	}
`
