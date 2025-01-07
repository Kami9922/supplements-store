import styled from 'styled-components'
import { Logo } from './components/logo/logo'
import { ControlPanel } from './components/control-panel/control-panel'

const Discription = styled.div`
	font-style: italic;
	display: flex;
	flex-direction: column;
`

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Discription>
			<span>Здоровье</span>
			<span>Сила</span>
			<span>Результат</span>
		</Discription>
		<ControlPanel />
	</header>
)

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0px -2px 17px #000;
	position: fixed;
	top: 0;
	width: 1000px;
	background-color: #fff;
	z-index: 10;
`
