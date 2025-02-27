import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'
import { Authorization } from './pages/authorization/authorization'
import { Registration } from './pages/registration/registration'
import { Users } from './pages/users/users'
import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './actions/other/set-user'
import { Main } from './pages/main/main'
import { Error } from './components/error/error'
import { ERROR } from './constants/error'
import { Product } from './pages/product/product'
import { Cart } from './pages/cart/cart'
import { ShoppingCart } from './components/shopping-cart/shopping-cart'
import { Modal } from './components/modal/modal'
import { ErrorBubble } from './components/error-bubble/error-bubble'
import { AdminPanel } from './pages/admin-panel/admin-panel'

const AppContainer = ({ className }) => {
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData')

		if (!currentUserDataJSON) {
			return
		}

		const currentUserData = JSON.parse(currentUserDataJSON)

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			})
		)
	}, [dispatch])

	return (
		<div className={className}>
			<div className='app-container'>
				<Header />
				<div className='page'>
					<Routes>
						<Route
							path='/'
							element={<Main />}
						/>
						<Route
							path='/login'
							element={<Authorization />}
						/>
						<Route
							path='/register'
							element={<Registration />}
						/>
						<Route
							path='/users'
							element={<Users />}
						/>
						<Route
							path='/admin-panel'
							element={<AdminPanel />}
						/>
						<Route
							path='/product/:id'
							element={<Product />}
						/>
						<Route
							path='/cart'
							element={<Cart />}
						/>
						<Route
							path='*'
							element={<Error error={ERROR.PAGE_NOT_EXIST} />}
						/>
					</Routes>
				</div>
				<Footer />
				<ErrorBubble />
				<Modal />
				<ShoppingCart />
			</div>
		</div>
	)
}

export const App = styled(AppContainer)`
	& .app-container {
		min-height: 100vh;
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: space-between;
		width: 1000px;
		background-color: #fff;
		margin: 0 auto;
	}

	& .page {
		padding: 120px 0 20px;
	}

	.no-products-found {
		text-align: center;
		font-size: 18px;
		padding-top: 45px;
	}
`
