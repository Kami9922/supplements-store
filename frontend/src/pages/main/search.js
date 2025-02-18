import React from 'react'
import styled from 'styled-components'
import { Icon } from '../../components/icon/icon'

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<input
				value={searchPhrase}
				placeholder='Поиск по товарам...'
				onChange={onChange}
			/>
			<Icon
				className='search-icon'
				inactive={true}
				id='fa-search'
				size='22px'
			/>
		</div>
	)
}

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	height: 40px;
	margin: 40px auto 0;

	& > input {
		padding: 10px 35px 10px 10px;
		border-radius: 15px;
		border: 1px solid rgb(146, 146, 146);
	}

	& .search-icon {
		position: absolute;
		top: 7px;
	}

	& > div {
		position: absolute;
		top: 3px;
		right: 9px;
	}
`
