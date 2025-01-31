import styled from 'styled-components'
import { H2 } from '../../components/h2/h2'
import { UserRow } from './components/user-row/user-row'
import { TableRow } from './components/table-row/table-row'
import { useEffect, useState } from 'react'
import { PrivateContent } from '../../components/private-content/private-content'
import { ROLE } from '../../constants/role'
import { checkAccess } from '../../utils/check-access'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors/user-selectors/select-user-role'
import { request } from '../../utils/request'
import { Loader } from '../../components/loader/loader'
import { isLoadingSelector } from '../../selectors/app-selectors/is-loading-selector'
import { setIsLoading } from '../../actions/set-is-loading'

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)

	const userRole = useSelector(selectUserRole)
	const isLoading = useSelector(isLoadingSelector)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}

		dispatch(setIsLoading(true, true))

		Promise.all([request('/users'), request('/users/roles')])
			.then(([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error)
					return
				}

				setUsers(usersRes.data)

				setRoles(rolesRes.data)
			})
			.finally(() => dispatch(setIsLoading(false, false)))
	}, [shouldUpdateUserList, userRole, dispatch])

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}

		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList)
		})
	}

	return (
		<PrivateContent
			access={[ROLE.ADMIN]}
			error={errorMessage}>
			<div className={className}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className='login-column column-title'>Логин</div>
						<div className='registered-at-column column-title'>
							Дата регистрации
						</div>

						<div className='role-column column-title'>Роль</div>
					</TableRow>

					{isLoading.loader ? (
						<Loader size='40px' />
					) : (
						users.map(({ id, login, registeredAt, roleId }) => (
							<UserRow
								id={id}
								key={id}
								login={login}
								registeredAt={registeredAt}
								roleId={roleId}
								roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
								onUserRemove={() => onUserRemove(id)}
							/>
						))
					)}
				</div>
			</div>
		</PrivateContent>
	)
}

export const Users = styled(UsersContainer)`
	display: flex;
	align-items: center;
	font-size: 18px;
	margin: 0 auto;
	flex-direction: column;
	width: 570px;

	& .column-title {
		font-weight: bold;
		font-size: 20px;
		margin-bottom: 10px;
		color: rgb(116, 116, 116);
	}
`
