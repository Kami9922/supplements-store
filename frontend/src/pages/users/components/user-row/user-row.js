import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '../../../../components/icon/icon'
import { TableRow } from '../table-row/table-row'
import { request } from '../../../../utils/request'
import { formatDate } from '../../../../utils/format-date'

const UserRowContainer = ({
	className,
	onUserRemove,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
}) => {
	const [initialRoleId, setInitailRoleId] = useState(userRoleId)
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitailRoleId(newUserRoleId)
		})
	}

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value))
	}

	const isSelectedButtonDisabled = selectedRoleId === initialRoleId

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className='login-column '>{login}</div>
				<span className='deco-stripe'></span>
				<div className='registered-at-column'>{formatDate(registeredAt)}</div>
				<span className='deco-stripe'></span>
				<div className='role-column '>
					<select
						value={selectedRoleId}
						onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option
								key={roleId}
								value={roleId}>
								{roleName}
							</option>
						))}
					</select>

					<Icon
						id='fa-floppy-o'
						margin={'0 0 0 10px'}
						disabled={isSelectedButtonDisabled}
						onClick={() => {
							onRoleSave(id, selectedRoleId)
						}}
					/>
				</div>
			</TableRow>
			<Icon
				className='remove-user'
				id='fa-trash-o'
				margin='0px 0px 0px 10px'
				onClick={onUserRemove}
			/>
		</div>
	)
}

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	& .remove-user {
		display: flex;
		align-self: center;
	}
	& .deco-stripe {
		border-right: 1px solid rgb(0, 0, 0);
		display: flex;
		height: 25px;
	}
	& select {
		border-radius: 5px;
		font-size: 16px;
		padding: 0 5px;
	}
`
