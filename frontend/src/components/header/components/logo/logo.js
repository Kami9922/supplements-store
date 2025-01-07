import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LargeText = styled.div`
	font-size: 48px;
	font-weight: 600;
	line-height: 48px;
	margin-top: 17px;
	margin-bottom: 10px;
`
const SmallText = styled.div`
	font-size: 18px;
	font-weight: bold;
`

const LogoContainer = ({ className }) => {
	return (
		<Link
			className={className}
			to='/'>
			<div>
				<LargeText>Dietary Supplements</LargeText>
				<SmallText>Магазин БАДов</SmallText>
			</div>
		</Link>
	)
}

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -21px;
`
