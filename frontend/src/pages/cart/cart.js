import styled from 'styled-components'
import { CartProducts } from './cart-products/cart-products'
import { SumToBuy } from './sum-to-buy/sum-to-buy'
import { PrivateContent } from '../../components/private-content/private-content'
import { ROLE } from '../../constants/role'

const CartContainer = ({ className }) => {
	return (
		<div className={className}>
			<PrivateContent access={[ROLE.ADMIN, ROLE.MODERATOR, ROLE.PURCHASER]}>
				<h3>Корзина</h3>
				<div className='cart-components'>
					<CartProducts />
					<SumToBuy />
				</div>
			</PrivateContent>
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
