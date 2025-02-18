import styled from 'styled-components'

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button
			className={className}
			{...props}>
			{children}
		</button>
	)
}

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
	height: ${({ height = '36px' }) => height};
	border: none;
	border-radius: 10px;
	color: ${({ color }) => (color ? color : 'rgb(255, 255, 255)')};
	background-color: ${({ background }) =>
		background ? background : ' #005bff'};
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	transition: background-color 0.5s;
	font-family: Comfortaa;
`
