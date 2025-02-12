import styled from 'styled-components'
import { Button } from '../../button/button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_MODAL } from '../../../actions/modal/close-modal'
import { selectModalIsOpen } from '../../../selectors/modal-selectors/select-modal-is-open'

const AlertModalContainer = ({ className, onCancel }) => {
	const dispatch = useDispatch()

	const isOpen = useSelector(selectModalIsOpen)

	return (
		<div className={className}>
			<div className='alert-modal'>
				{isOpen.alertCart ? (
					<span>Корзина доступна только авторизованным пользователям!</span>
				) : (
					<span>Функционал ещё в разработке ^-^</span>
				)}
			</div>
			<div className='alert-buttons'>
				{isOpen.alertCart && (
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
					width='145px'
					onClick={onCancel}>
					Вернуться
				</Button>
			</div>
		</div>
	)
}

export const AlertModal = styled(AlertModalContainer)`
	& .alert-modal > span {
		font-weight: 600;
		font-size: 18px;
	}

	& .alert-buttons {
		display: flex;
		justify-content: center;
		gap: 25px;
	}

	& .alert-modal {
		margin-bottom: 20px;
	}
`
