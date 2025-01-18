import styled from 'styled-components'
import PropTypes from 'prop-types'

const IconContainer = ({ className, id, inactive, ...props }) => (
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
	cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
	/* &:hover {
		box-shadow: inset 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
	} */
`
Icon.propTypes = {
	id: PropTypes.string.isRequired,
	inactive: PropTypes.bool,
}
