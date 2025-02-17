import styled from 'styled-components'

const ProductConsiceDescriptionContainer = ({ className, product }) => {
	return (
		<div className={className}>
			<span className='about-span'>О товаре</span>
			<div>
				<span className='bold-span product-title'>{product.title}</span>
			</div>
			<div className='description-span'>
				<span className='bold-span'>Осталось в магазине: </span>
				<span>{product.storeAmount + ' ед.'}</span>
			</div>
			<div className='description-span'>
				<span className='bold-span'>Категория: </span>
				<span>{product.category}</span>
			</div>
			<div className='description-span'>
				<span className='bold-span'>Цена: </span>
				<span>{product.cost + '₽'}</span>
			</div>
		</div>
	)
}

export const ProductConsiceDescription = styled(
	ProductConsiceDescriptionContainer
)`
	display: flex;
	flex-direction: column;
	margin-left: 25px;
	padding: 20px 55px 0 0;
	padding-top: 25px;
	border-top: 1px solid #000;
	gap: 15px;
	width: 100%;

	& .about-span {
		font-weight: bold;
		font-size: 24px;
		color: rgb(158, 158, 158);
	}

	& .product-title {
		font-size: 24px;
	}

	& .bold-span {
		font-weight: 500;
	}

	& .description-span {
		border-top: 1px solid rgba(204, 214, 228, 0.6);
		padding-top: 5px;
	}
`
