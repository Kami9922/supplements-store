import styled from 'styled-components'

const FooterContainer = ({ className }) => {
	return (
		<div className={className}>
			<div>
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
	box-shadow: 0px 2px 17px #000;
	font-weight: bold;
`
