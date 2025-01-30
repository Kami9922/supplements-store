import styled from 'styled-components'
import { Button } from '../../../../components/button/button'
import { useSelector } from 'react-redux'
import { categoriesSelector } from '../../../../selectors/categories-selectors/categories-selector'
import { allProductsSelector } from '../../../../selectors/products-selectors/all-products-selector'

const SortButtonsContainer = ({
	isChoosingCategory,
	onCategoriesClick,
	resetSorting,
	sortProductsByCost,
	isSorting,
	sortProductsByCategory,
	className,
}) => {
	const categories = useSelector(categoriesSelector)
	const products = useSelector(allProductsSelector)

	return (
		<div className={className}>
			<div className='sort-buttons'>
				<Button
					className='sort-button'
					background='transparent'
					color='#000'
					height='40px'
					width='260px'
					onClick={sortProductsByCost}>
					Сортировать по стоимости
				</Button>

				{!isChoosingCategory ? (
					<Button
						className='sort-button'
						background='transparent'
						color='#000'
						height='40px'
						width='260px'
						onClick={onCategoriesClick}>
						Категории
					</Button>
				) : (
					<div className='category-sort-buttons'>
						{categories.map((category, index) => (
							<Button
								className='category-button'
								color='rgb(0, 0, 0)'
								background='transparent'
								width='120px'
								height='44px'
								key={index}
								onClick={() => sortProductsByCategory(products, category)}>
								{category}
							</Button>
						))}
					</div>
				)}
			</div>
			{isSorting && (
				<Button
					className='reset-button'
					color='rgb(129, 129, 129)'
					background='transparent'
					width='100px'
					onClick={resetSorting}>
					Сбросить
				</Button>
			)}
		</div>
	)
}

export const SortButtons = styled(SortButtonsContainer)`
	display: flex;
	padding: 30px 40px 0;
	flex-direction: column;

	& .category-sort-buttons {
		display: flex;
	}

	& .category-button {
		display: flex;
		align-self: center;
		font-weight: bold;
		border-left: 1px solid rgb(197, 197, 197);
		border-bottom: 1px solid rgb(197, 197, 197);
	}
	& .category-button:hover {
		background-color: rgb(230, 230, 230);
	}

	& .sort-buttons {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	& .sort-button {
		padding: 5px;
		border: 1px solid rgb(211, 211, 211);
	}
	& .sort-button:hover {
		border: 1px solid rgb(121, 121, 121);
	}

	& .reset-button {
		margin: 0 auto;
	}

	& .reset-button:hover {
		color: rgb(199, 199, 199);
	}
`
