import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { cartProductsSelector } from '../../../selectors/cart-selectors/cart-products-selector'
import { Button } from '../../../components/button/button'

const SumToBuyContainer = ({ className }) => {
	const cartProducts = useSelector(cartProductsSelector)

	return (
		<div className={className}>
			<div className='sum-container'>
				<div className='sum'>
					<span className='sum-declaration'>Итоговая стоимость:</span>
					<span className='sum-span'>
						{cartProducts
							?.map((product) => product.cost * product.quantity)
							?.reduce((acc, cost) => acc + cost, 0) + '₽'}
					</span>
				</div>
				<Button
					className='buy-button'
					height='50px'>
					Купить
				</Button>
			</div>
		</div>
	)
}

export const SumToBuy = styled(SumToBuyContainer)`
	width: 30%;

	& .sum-container {
		display: flex;
		flex-direction: column;
		padding: 35px 15px 30px;
		font-size: 20px;
		border: 1px solid #000;
		border-radius: 15px;
		width: 100%;
		height: 250px;
		justify-content: space-between;
	}

	& .sum-declaration {
		font-weight: 600;
		font-size: 22px;
	}

	& .buy-button {
		font-size: 23px;
		margin: 0 auto;
		font-weight: 600;
	}

	& .sum {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	& .sum-span {
		font-size: 34px;
		font-weight: 700;
		color: rgb(11, 155, 59);
	}
`
