import React from 'react'
import styled from 'styled-components'
import { Icon } from '../../../icon/icon'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../../button/button'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserRole } from '../../../../selectors/user-selectors/select-user-role'
import { ROLE } from '../../../../constants/role'
import { selectUserLogin } from '../../../../selectors/user-selectors/select-user-login'
import { logoutAction } from '../../../../actions/logout-action'
import { checkAccess } from '../../../../utils/check-access'

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`

const Username = styled.div`
	font-size: 18px;
	font-weight: bold;
`

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate()

	const dispatch = useDispatch()

	const roleId = useSelector(selectUserRole)
	const login = useSelector(selectUserLogin)

	const onLogout = () => {
		dispatch(logoutAction())
		sessionStorage.removeItem('userData')
	}

	const isAdmin = checkAccess([ROLE.ADMIN], roleId)

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to='/login'>Войти</Link>
					</Button>
				) : (
					<>
						<Username>{login}</Username>

						<Icon
							id='fa-sign-out'
							margin='0px 0px 0px 10px'
							onClick={onLogout}
						/>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					onClick={() => navigate(-1)}
					id='fa-backward'
					margin='10px 0px 0px 0px'
				/>

				{isAdmin && (
					<>
						<Link to='/EditProducts'>
							<Icon
								id='fa-pencil-square-o'
								margin='10px 0px 0px 16px'
							/>
						</Link>
						<Link to='/users'>
							<Icon
								id='fa-users'
								margin='10px 0px 0px 16px'
							/>
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	)
}

export const ControlPanel = styled(ControlPanelContainer)``
