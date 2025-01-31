import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon } from '../../../../components/icon/icon'

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Icon
				size='45px'
				className='pagination-icon'
				disabled={page === 1}
				inactive={page === 1 ? true : undefined}
				active={page !== 1 ? true : undefined}
				id='fa-angle-double-left'
				onClick={() => setPage(1)}></Icon>
			<Icon
				size='45px'
				className='pagination-icon'
				disabled={page === 1}
				inactive={page === 1 ? true : undefined}
				active={page !== 1 ? true : undefined}
				id='fa-angle-left'
				onClick={() => setPage(page - 1)}></Icon>

			<div className='current-page'>{page}</div>
			<Icon
				size='45px'
				className='pagination-icon'
				disabled={page === lastPage}
				inactive={page === lastPage ? true : undefined}
				active={page !== lastPage ? true : undefined}
				id='fa-angle-right'
				onClick={() => setPage(page + 1)}></Icon>
			<Icon
				size='45px'
				className='pagination-icon'
				disabled={page === lastPage}
				inactive={page === lastPage ? true : undefined}
				active={page !== lastPage ? true : undefined}
				id='fa-angle-double-right'
				onClick={() => setPage(lastPage)}></Icon>
		</div>
	)
}

export const Pagination = styled(PaginationContainer)`
	position: absolute;
	display: flex;
	padding: 0 35px;
	bottom: 165px;
	width: 100%;
	justify-content: center;
	gap: 30px;

	& .pagination-icon {
		width: 30px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	& .current-page {
		padding-top: 3px;
		height: 32px;
		margin: 0 5px;
		font-size: 34px;
		font-weight: 500;
		line-height: 26px;
		text-align: center;
	}
`
Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
}
