import React from 'react'
import styled from 'styled-components'
import { Icon } from '../../../icon/icon'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../../button/button'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserRole } from '../../../../selectors/user-selectors/select-user-role'
import { ROLE } from '../../../../constants/role'
import { selectUserLogin } from '../../../../selectors/user-selectors/select-user-login'
import { logoutAction } from '../../../../actions/other/logout-action'
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
	const roleId = useSelector(selectUserRole)
	const login = useSelector(selectUserLogin)

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const onLogout = () => {
		dispatch(logoutAction())
		sessionStorage.removeItem('userData')
		navigate('/')
	}

	const isAdmin = checkAccess([ROLE.ADMIN], roleId)
	const isModerator = checkAccess([ROLE.MODERATOR], roleId)

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button
						background='transparent'
						color='rgb(194, 194, 194)'
						className='login-button'>
						<Link to='/login'>Войти</Link>
					</Button>
				) : (
					<>
						<Username>{login}</Username>
						<Icon
							id='fa-sign-out'
							margin='0px 0px 0px 10px'
							onClick={onLogout}
							transActive={true}
						/>
					</>
				)}
			</RightAligned>
			<RightAligned>
				{(isAdmin || isModerator) && (
					<div className='links-panel'>
						<Link to='/admin-panel'>
							<Icon
								id='fa-pencil-square-o'
								margin='10px 0px 0px 16px'
								transActive={true}
							/>
						</Link>
						{isAdmin && (
							<Link to='/users'>
								<Icon
									transActive={true}
									id='fa-users'
									margin='10px 0px 0px 16px'
								/>
							</Link>
						)}
					</div>
				)}
			</RightAligned>
		</div>
	)
}

export const ControlPanel = styled(ControlPanelContainer)`
	font-family: Comfortaa;
	& .login-button {
		font-size: 24px;
		padding: 20px;
		border-left: 2px solid rgb(197, 197, 197);
		border-bottom: 2px solid rgb(197, 197, 197);
	}

	& .links-panel {
		display: flex;
		justify-content: space-between;
	}

	& .login-button:hover {
		background-color: rgb(197, 197, 197);
	}
`
