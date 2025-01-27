import styled from 'styled-components'
import { Icon } from '../icon/icon'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartProductsSelector } from '../../selectors/cart-selectors/cart-products-selector'
import { useEffect } from 'react'
import { setCartProductsAsync } from '../../actions/set-cart-products-async'

const ShoppingCartContainer = ({ className }) => {
	const cartProducts = useSelector(cartProductsSelector)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setCartProductsAsync())
	}, [dispatch])

	return (
		<Link
			className={className}
			to='/cart'>
			<div>
				<Icon
					size='70px'
					className='cart-icon'
					id='fa fa-shopping-cart'
					margin='0px 5px 0px 0px'
				/>
				{cartProducts.length > 0 && (
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
`
