import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LargeText = styled.div`
	font-size: 48px;
	font-weight: 600;
	line-height: 48px;
	padding: 0px 20px;
`

const LogoContainer = ({ className }) => {
	return (
		<Link
			className={className}
			to='/'>
			<div className='logo-container'>
				<LargeText>Dietary Supplements</LargeText>
			</div>
			<div className='circle-medium'></div>
			<div className='circle-little'></div>
			<div className='circle-super-little'></div>
		</Link>
	)
}

export const Logo = styled(LogoContainer)`
	display: flex;

	& .logo-container {
		align-items: center;
		border: 1px solid #000;
		border-radius: 50px;
		display: flex;
	}
	& .circle-medium {
		display: flex;
		margin-left: 5px;
		align-self: center;
		border: 1px solid #000;
		border-radius: 50px;
		width: 40px;
		height: 40px;
	}
	& .circle-little {
		display: flex;
		margin-left: 5px;
		align-self: center;
		border: 1px solid #000;
		border-radius: 50px;
		width: 20px;
		height: 20px;
	}
	& .circle-super-little {
		display: flex;
		margin-left: 5px;
		align-self: center;
		border: 1px solid #000;
		border-radius: 50px;
		width: 10px;
		height: 10px;
	}
`
