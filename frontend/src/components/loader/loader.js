import React from 'react'
import styled from 'styled-components'

const LoaderContainer = ({ className, ...props }) => {
	return (
		<div
			className={className}
			{...props}></div>
	)
}

export const Loader = styled(LoaderContainer)`
	top: 50%;
	left: 50%;
	position: absolute;
	transform: translate(-50%, -50%);
	height: ${({ size = '40px' }) => size};
	width: ${({ size = '40px' }) => size};
	border: 5px solid gray;
	border-radius: 50%;
	border-left-color: transparent;
	animation: loader 1s infinite;
	/* margin: ${({ margin = '0 auto' }) => margin}; */

	@keyframes loader {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`
