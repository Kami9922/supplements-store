import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { selectModalIsOpen } from '../../selectors/modal-selectors/select-modal-is-open'
import { selectModalOnConfirm } from '../../selectors/modal-selectors/select-modal-on-confirm'
import { productSelector } from '../../selectors/product-selectors/product-selector'
import { useEffect, useState } from 'react'
import { CLOSE_MODAL } from '../../actions/modal/close-modal'
import { ModalInputs } from './form-modal-inputs/form-modal-inputs'
import { FormModalButtons } from './form-modal-buttons/form-modal-buttons'
import { AlertModal } from './alert-modal/alert-modal'

const authFormSchema = yup.object().shape({
	formTitle: yup
		.string()
		.required('Введите название товара')
		.matches(/^[A-Za-zА-Яа-яЁё0-9\s]+$/, 'Недопустимое название товара')
		.min(3, 'Недопустимое название товара. Минимум 3 символа')
		.max(20, 'Недопустимое название товара. Максмиум 20 символов'),
	formCategory: yup
		.string()
		.required('Введите категорию товара')
		.matches(
			/^[A-Za-zА-Яа-яЁё0-9\s]+$/,
			'Недопустимое название категории товара'
		)
		.min(3, 'Недопустимое название категории. Минимум 6 символов')
		.max(15, 'Недопустимое название категории. Максиум 15 символов'),
	formCost: yup
		.number()
		.required('Введите стоимость товара')
		.typeError('Стоимость должна быть числом')
		.integer('Стоимость должна быть целым числом')
		.min(1, 'Стоимость должна быть больше 0')
		.max(999999999999999, 'Слишком большая стоимость'),
	formStoreAmount: yup
		.number()
		.required('Введите количество товара')
		.typeError('Количество товара должно быть числом')
		.integer('Количество товара должно быть целым числом')

		.min(1, 'Количество товара должно быть больше 0')
		.max(999999999999999, 'Слишком большое количестово товара'),
	formInfo: yup
		.string()
		.required('Введите описание товара')
		.matches(/^(?!.* {2}).*$/, 'Недопустимое описание товара')
		.min(3, 'Недопустимое описание товара. Минимум 3 символа')
		.max(99, 'Недопустимое описание товара. Максмиум 99 символов'),
})

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen)
	const onConfirm = useSelector(selectModalOnConfirm)
	const product = useSelector(productSelector)

	const dispatch = useDispatch()

	const [title, setTitle] = useState(product.title)
	const [category, setCategory] = useState(product.category)
	const [cost, setCost] = useState(product.cost)
	const [storeAmount, setStoreAmount] = useState(product.storeAmount)
	const [info, setInfo] = useState(product.info)
	const [image, setImage] = useState(null)
	const [isTypingUrl, setIsTypingUrl] = useState(false)
	const [error, setError] = useState(null)

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: title,
			category: category,
			cost: cost,
			storeAmount: storeAmount,
			info: info,
		},
		resolver: yupResolver(authFormSchema),
	})

	useEffect(() => {
		if (product) {
			reset({
				formTitle: product.title,
				formCategory: product.category,
				formCost: product.cost,
				formStoreAmount: product.storeAmount,
				formInfo: product.info,
			})
		}
	}, [product, reset])

	const resetInputs = () => {
		reset()
		setImage(null)
		setIsTypingUrl(false)
	}

	const onSubmit = ({
		formTitle,
		formCategory,
		formCost,
		formStoreAmount,
		formInfo,
	}) => {
		const formData = new FormData()
		formData.append('title', formTitle)
		formData.append('category', formCategory)
		formData.append('cost', formCost)
		formData.append('storeAmount', formStoreAmount)
		formData.append('image', image)
		formData.append('info', formInfo)

		onConfirm(product.id, formData, resetInputs)
	}

	const onCancel = () => {
		dispatch(CLOSE_MODAL)
		resetInputs()
	}

	const checkToOpen = () => {
		const isTrueValue = Object.values(isOpen).includes(true)
		return isTrueValue
	}

	if (!checkToOpen()) {
		return null
	}

	return (
		<div className={className}>
			<div className='overlay'></div>
			<div className='box'>
				{isOpen.product ? (
					<form onSubmit={handleSubmit(onSubmit)}>
						<h3>Добавление товара</h3>
						<ModalInputs
							register={register}
							isTypingUrl={isTypingUrl}
							setTitle={setTitle}
							setCategory={setCategory}
							setCost={setCost}
							setStoreAmount={setStoreAmount}
							setImage={setImage}
							setInfo={setInfo}
							setIsTypingUrl={setIsTypingUrl}
							errors={errors}
						/>
						<FormModalButtons onCancel={onCancel} />
					</form>
				) : (
					<AlertModal onCancel={onCancel} />
				)}
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

	& h3 {
		font-size: 22px;
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
