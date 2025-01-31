import styled from 'styled-components'
import PropTypes from 'prop-types'

const IconContainer = ({
	className,
	id,
	active,
	inactive,
	transActive,
	...props
}) => (
	<div
		className={className}
		{...props}>
		<i
			className={`fa ${id}`}
			aria-hidden='true'></i>
	</div>
)

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	height: ${({ height = 'inherit' }) => height};
	width: ${({ width = 'inherit' }) => width};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
	color: ${({ color }) => color};
	background-color: ${({ background = 'inherit' }) => background};
	cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};

	& i:hover {
		font-size: ${({ active }) => (active ? '1.05em' : 'inherit')};
		transform: ${({ transActive }) =>
			transActive ? 'translate(0px, -1px)' : 'translate(0px, 0px)'};
	}
`
Icon.propTypes = {
	id: PropTypes.string.isRequired,
	inactive: PropTypes.bool,
	active: PropTypes.bool,
}
