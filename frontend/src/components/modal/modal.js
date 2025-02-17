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
		.matches(/^[A-Za-zА-Яа-яЁё0-9\s-]+$/, 'Недопустимое название товара')
		.min(3, 'Недопустимое название товара. Минимум 3 символа')
		.max(40, 'Недопустимое название товара. Максмиум 40 символов'),
	formCategory: yup
		.string()
		.required('Введите категорию товара')
		.matches(
			/^[A-Za-zА-Яа-яЁё0-9\s]+$/,
			'Недопустимое название категории товара'
		)
		.min(3, 'Недопустимое название категории. Минимум 6 символов')
		.max(25, 'Недопустимое название категории. Максиум 25 символов'),
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
	formImage: yup
		.mixed()
		.nullable()
		.test('fileSize', 'Размер файла должен быть меньше 10 МБ', (value) => {
			if (!value || (value instanceof FileList && value.length === 0)) {
				return true
			}
			return value[0].size <= 10 * 1024 * 1024
		})
		.test(
			'fileType',
			'Поддерживаются только изображения (jpg, jpeg, png)',
			(value) => {
				if (!value || (value instanceof FileList && value.length === 0)) {
					return true
				}
				return ['image/jpg', 'image/jpeg', 'image/png'].includes(value[0].type)
			}
		),
	formInfo: yup
		.string()
		.required('Введите описание товара')
		.matches(/^(?!.* {2}).*$/, 'Недопустимое описание товара')
		.min(3, 'Недопустимое описание товара. Минимум 3 символа')
		.max(250, 'Недопустимое описание товара. Максмиум 250 символов'),
})

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen)
	const onConfirm = useSelector(selectModalOnConfirm)
	const product = useSelector(productSelector)

	const dispatch = useDispatch()

	const [title, setTitle] = useState(``)
	const [category, setCategory] = useState(``)
	const [cost, setCost] = useState(``)
	const [storeAmount, setStoreAmount] = useState(``)
	const [info, setInfo] = useState(``)
	const [image, setImage] = useState(null)
	const [isTypingUrl, setIsTypingUrl] = useState(false)

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			formTitle: title,
			formCategory: category,
			formCost: cost,
			formStoreAmount: storeAmount,
			formInfo: info,
			formImage: null,
			formTextUrl: null,
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
				formImage: null,
				formTextUrl: null,
				formInfo: product.info,
			})
			setImage(product.imageUrl)
		}
	}, [product, reset])

	const resetInputs = () => {
		reset()
		setIsTypingUrl(false)
	}

	const onSubmit = ({
		formTitle,
		formCategory,
		formCost,
		formStoreAmount,
		formInfo,
		formImage,
		formTextUrl,
	}) => {
		const deleteImageFlag =
			!formImage || !formImage || formImage.length <= 0 ? 'false' : 'true'

		const imageToSubmit = formTextUrl || (formImage && formImage[0]) || image

		const formData = new FormData()
		formData.append('title', formTitle)
		formData.append('category', formCategory)
		formData.append('cost', formCost)
		formData.append('storeAmount', formStoreAmount)
		formData.append('image', imageToSubmit)
		formData.append('info', formInfo)
		formData.append('deleteImageFlag', deleteImageFlag)

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
							setInfo={setInfo}
							setIsTypingUrl={setIsTypingUrl}
							setImage={setImage}
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
