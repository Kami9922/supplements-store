import styled from 'styled-components'
import { H2 } from '../../components/h2/h2'
import { UserRow } from './components/user-row/user-row'
import { TableRow } from './components/table-row/table-row'
import { useEffect, useState } from 'react'
import { PrivateContent } from '../../components/private-content/private-content'
import { ROLE } from '../../constants/role'
import { checkAccess } from '../../utils/check-access'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors/select-user-role'
import { request } from '../../utils/request'

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)

	const userRole = useSelector(selectUserRole)

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}

		Promise.all([request('/users'), request('/users/roles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error)
					return
				}

				setUsers(usersRes.data)

				setRoles(rolesRes.data)
			}
		)
	}, [shouldUpdateUserList, userRole])

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
						<div className='login-column'>Логин</div>
						<div className='registered-at-column'>Дата регистрации</div>
						<div className='role-column'>Роль</div>
					</TableRow>

					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							id={id}
							key={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
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
`
