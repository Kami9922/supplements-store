import React from 'react'
import styled from 'styled-components'
import { PROP_TYPE } from '../../constants/prop-type'

const Div = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	font-size: 18px;
`

export const Error = ({ error }) =>
	error && (
		<Div>
			<h2>Ошибка</h2>
			<div>{error}</div>
		</Div>
	)

Error.propTypes = {
	error: PROP_TYPE.ERROR,
}
