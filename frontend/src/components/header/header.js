import styled from 'styled-components'
import { Logo } from './components/logo/logo'
import { ControlPanel } from './components/control-panel/control-panel'

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<div className='header-discription'>
			<span>Здоровье</span>
			<span>Сила</span>
			<span>Результат</span>
		</div>
		<ControlPanel />
	</header>
)

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	height: 120px;
	padding: 20px 40px;
	position: fixed;
	top: 0;
	width: 1000px;
	background-color: rgb(255, 255, 255);
	z-index: 10;
	border-bottom: 1px solid rgb(211, 211, 211);

	& .header-discription {
		font-style: italic;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 40px;
	}
`
