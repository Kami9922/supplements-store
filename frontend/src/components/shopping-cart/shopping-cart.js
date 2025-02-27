import styled from 'styled-components'
import { Icon } from '../icon/icon'
import { Link, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartProductsSelector } from '../../selectors/cart-selectors/cart-products-selector'
import { useEffect, useState } from 'react'

import { selectUserRole } from '../../selectors/user-selectors/select-user-role'
import { ROLE } from '../../constants/role'
import { setCartProductsAsync } from '../../actions/cart-products/async-cart-product-actions/set-cart-products-async'

const ShoppingCartContainer = ({ className }) => {
	const [isCartLoading, setIsCartLoading] = useState(true)

	const cartProducts = useSelector(cartProductsSelector)
	const roleId = useSelector(selectUserRole)

	const adminPanelMatch = useMatch('/admin-panel')
	const usersMatch = useMatch('/users')

	const dispatch = useDispatch()

	useEffect(() => {
		if (roleId !== ROLE.GUEST) {
			setIsCartLoading(true)
			dispatch(setCartProductsAsync()).finally(() => {
				setIsCartLoading(false)
			})
		}
	}, [dispatch, roleId])

	if (roleId === ROLE.GUEST || adminPanelMatch || usersMatch) {
		return null
	}

	return (
		<Link
			className={className}
			to='/cart'>
			<div className='cart-container'>
				<Icon
					size='70px'
					className='cart-icon'
					id='fa fa-shopping-cart'
					margin='0px 5px 0px 0px'
				/>
				{!isCartLoading && cartProducts.length > 0 && (
					<div className='cart-products-count'>{cartProducts.length}</div>
				)}
			</div>
		</Link>
	)
}

export const ShoppingCart = styled(ShoppingCartContainer)`
	bottom: 50px;
	right: 50px;
	position: fixed;
	width: 110px;
	height: 110px;
	border: 4px solid #000;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;

	& .cart-products-count {
		position: absolute;
		padding-top: 5px;
		width: 32px;
		height: 32px;
		font-size: 20px;
		text-align: center;
		left: 0;
		bottom: 0;
		border-radius: 50%;
		background-color: rgb(228, 188, 56);
		color: #fff;
	}

	& .cart-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70px;
		height: 70px;
	}

	&:hover {
		width: 108px;
		height: 108px;
	}
`
