import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { errorMessageSelector } from '../../selectors/app-selectors/error-message-selector'
import { Icon } from '../icon/icon'
import { setErrorMessage } from '../../actions/other/set-error-message'

const ErrorBubbleContainer = ({ className }) => {
	const errorMessage = useSelector(errorMessageSelector)

	const dispatch = useDispatch()

	const onCloseErrorBubble = () => {
		dispatch(setErrorMessage(null))
	}

	if (!errorMessage) {
		return null
	}

	return (
		<div className={className}>
			<div>{errorMessage}</div>
			<Icon
				width='24px'
				className='error-close-icon'
				id='fa fa-times'
				active={true}
				onClick={onCloseErrorBubble}
			/>
		</div>
	)
}
export const ErrorBubble = styled(ErrorBubbleContainer)`
	width: 250px;
	padding: 30px 20px 20px;
	border-radius: 15px;
	display: flex;
	align-items: center;
	text-align: center;
	/* border: 1px solid black; */
	background-color: rgb(255, 245, 210);
	color: rgb(255, 0, 0);
	position: fixed;
	left: 100px;
	top: 200px;

	& .error-close-icon {
		position: absolute;
		top: 5px;
		right: 6px;
	}
`
