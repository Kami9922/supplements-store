import React from 'react'
import styled from 'styled-components'
import { Link, useMatch } from 'react-router-dom'

const LogoContainer = ({ className }) => {
	const mainMatch = useMatch('/')

	const handleRefresh = () => {
		if (mainMatch) {
			window.location.reload()
		}
	}

	return (
		<Link
			className={className}
			to='/'
			onClick={handleRefresh}>
			<div className='logo-container'>
				<div className='large-text'>Dietary Supplements</div>
			</div>
			<div className='circle-medium'></div>
			<div className='circle-little'></div>
			<div className='circle-super-little'></div>
		</Link>
	)
}

export const Logo = styled(LogoContainer)`
	display: flex;
	font-family: Comfortaa;
	& .large-text {
		font-size: 38px;
		font-weight: 600;
		line-height: 48px;
		padding: 0px 20px;
	}

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
