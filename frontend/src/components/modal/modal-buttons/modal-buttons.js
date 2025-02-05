import styled from 'styled-components'
import { Button } from '../../button/button'
import { useDispatch, useSelector } from 'react-redux'
import { selectModalIsOpen } from '../../../selectors/modal-selectors/select-modal-is-open'
import { Link } from 'react-router-dom'
import { CLOSE_MODAL } from '../../../actions/modal/close-modal'

const ModalButtonsContainer = ({ className, handleSubmit, onCancel }) => {
	const isOpen = useSelector(selectModalIsOpen)
	const dispatch = useDispatch()

	return (
		<div className={className}>
			{isOpen.product ? (
				<Button
					width='120px'
					type='submit'
					onClick={handleSubmit}>
					Сохранить
				</Button>
			) : (
				<Link
					className='to-login-link'
					to='/login'>
					<Button
						width='120px'
						onClick={() => dispatch(CLOSE_MODAL)}>
						Войти
					</Button>
				</Link>
			)}
			<Button
				width='120px'
				onClick={onCancel}>
				Отмена
			</Button>
		</div>
	)
}

export const ModalButtons = styled(ModalButtonsContainer)`
	display: flex;
	justify-content: center;
	gap: 15px;

	& button {
		border-radius: 5px;
	}
`
