import styled from 'styled-components'
import { CartProducts } from './cart-products/cart-products'
import { SumToBuy } from './sum-to-buy/sum-to-buy'

const CartContainer = ({ className }) => {
	return (
		<div className={className}>
			<h3>Корзина</h3>
			<div className='cart-components'>
				<CartProducts />
				<SumToBuy />
			</div>
		</div>
	)
}

export const Cart = styled(CartContainer)`
	padding: 20px;

	& .cart-components {
		display: flex;
	}
	& h3 {
		font-size: 30px;
		margin: 0 0 15px;
	}
`
