import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { cartProductsSelector } from '../../../selectors/cart-selectors/cart-products-selector'

const SumToBuyContainer = ({ className }) => {
	const cartProducts = useSelector(cartProductsSelector)

	return (
		<div className={className}>
			<div className='sum-container'>
				<span>Итоговая стоимость:</span>
				<span>
					{cartProducts
						?.map((product) => product.cost * product.quantity)
						?.reduce((acc, cost) => acc + cost, 0)}
				</span>
			</div>
		</div>
	)
}

export const SumToBuy = styled(SumToBuyContainer)`
	width: 30%;

	& .sum-container {
		display: flex;
		flex-direction: column;
		padding: 45px 15px;
		font-size: 20px;
		gap: 5px;
		border: 1px solid #000;
		border-radius: 15px;
		width: 100%;
		height: 450px;
	}
`
