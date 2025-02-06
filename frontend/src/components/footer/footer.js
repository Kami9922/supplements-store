import styled from 'styled-components'

const FooterContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className='footer-container'>
				<span className='footer-upper-text'>Магазин БАДов</span>
				<span>dietary-supplements.ru</span>
			</div>
		</div>
	)
}

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	font-weight: bold;
	border-radius: 15px;
	background-color: rgb(243, 243, 243);

	& .footer-upper-text {
		display: block;
		margin-bottom: 2px;
	}

	& .footer-container {
		padding: 15px;
		border: 1px solid rgb(219, 219, 219);
		border-radius: 20px;
	}
`
