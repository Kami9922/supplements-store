import { useSelector } from 'react-redux'
import { Error } from '../error/error'
import { selectUserRole } from '../../selectors/user-selectors/select-user-role'
import { ERROR } from '../../constants/error'
import { checkAccess } from '../../utils/check-access'

export const PrivateContent = ({ access, children, serverError = null }) => {
	const userRole = useSelector(selectUserRole)

	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED

	const error = serverError || accessError

	return error ? <Error error={error} /> : children
}
