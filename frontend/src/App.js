import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'
import { Authorization } from './pages/authorization/authorization'
import { Registration } from './pages/registration/registration'
import { Users } from './pages/users/users'
import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './actions/set-user'
import { Modal } from './components/modal/modal'
import { Main } from './pages/main/main'
import { Error } from './components/error/error'
import { ERROR } from './constants/error'
import { EditProducts } from './pages/edit-products/edit-products'
import { Product } from './pages/product/product'

const AppColumn = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`
const Page = styled.div`
	padding: 120px 0 20px;
`

const App = () => {
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
		<AppColumn>
			<Header />
			<Page>
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
						path='/editProducts'
						element={<EditProducts />}
					/>
					<Route
						path='/product/:id'
						element={<Product />}
					/>
					{/* <Route
						path='/post/:id/edit'
						element={<Post />}
					/> */}
					<Route
						path='*'
						element={<Error error={ERROR.PAGE_NOT_EXIST} />}
					/>
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	)
}

export default App
