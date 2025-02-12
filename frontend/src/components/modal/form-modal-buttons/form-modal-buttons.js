import styled from 'styled-components'
import { Button } from '../../button/button'

const FormModalButtonsContainer = ({ className, onCancel }) => {
	return (
		<div className={className}>
			<Button
				width='145px'
				type='submit'>
				Сохранить
			</Button>
			<Button
				width='145px'
				type='button'
				onClick={onCancel}>
				Отмена
			</Button>
		</div>
	)
}

export const FormModalButtons = styled(FormModalButtonsContainer)`
	display: flex;
	justify-content: center;
	gap: 15px;
`
