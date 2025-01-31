import styled from 'styled-components'
import PropTypes from 'prop-types'

const TableRowContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>
}

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid #000;' : 'none')};
	border-radius: 10px;

	& > div {
		display: flex;
		padding: 0 10px;
	}

	& .login-column {
		width: 172px;
		font-weight: 500;
	}
	& .registered-at-column {
		width: 213px;
	}
	& .role-column {
		width: auto;
	}
`
TableRow.propTypes = {
	children: PropTypes.node.isRequired,
}
