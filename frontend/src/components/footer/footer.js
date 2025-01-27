import styled from 'styled-components'

const FooterContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className='footer-container'>
				<div>Магазин БАДов</div>
				<div>dietary-supplements.ru</div>
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
	/* box-shadow: 0px 2px 17px #000; */
	font-weight: bold;
	border-radius: 15px;
	background-color: rgb(243, 243, 243);

	& .footer-container {
		/* background-color: rgb(223, 223, 223); */
		padding: 10px;
		border: 1px solid rgb(219, 219, 219);
		border-radius: 20px;
	}
`
