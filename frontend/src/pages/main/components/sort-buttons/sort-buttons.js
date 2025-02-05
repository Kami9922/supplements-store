import styled from 'styled-components'
import { Button } from '../../../../components/button/button'
import { useSelector } from 'react-redux'
import { categoriesSelector } from '../../../../selectors/categories-selectors/categories-selector'
import { Icon } from '../../../../components/icon/icon'

const SortButtonsContainer = ({
	isChoosingCategory,
	resetSorting,
	sortProductsByCost,
	sortProductsByCategory,
	setIsChoosingCategory,
	sortBy,
	isChoosingSortType,
	setIsChoosingSortType,
	className,
}) => {
	const categories = useSelector(categoriesSelector)

	return (
		<div className={className}>
			<div className='sort-buttons'>
				{!isChoosingSortType ? (
					<Button
						className='sort-button'
						background='transparent'
						color='#000'
						height='50px'
						width='260px'
						onClick={() => setIsChoosingSortType(true)}>
						Сортировать по стоимости
					</Button>
				) : (
					<div className='choice-cost-sort-buttons'>
						<Button
							className='choice-cost-sort-button'
							background='transparent'
							color='#000'
							onClick={() => sortProductsByCost('asc')}>
							<Icon
								size='40px'
								className='sort-icon'
								height='24px'
								id='fa-sort-asc'
								margin='2px 0px 0px 0px'
							/>
						</Button>
						<Button
							className='choice-cost-sort-button'
							background='transparent'
							color='#000'
							onClick={() => sortProductsByCost('desc')}>
							<Icon
								size='40px'
								className='sort-icon'
								id='fa-sort-desc'
								margin='0px 0px 25px 0px'
							/>
						</Button>
					</div>
				)}

				{!isChoosingCategory ? (
					<Button
						className='sort-button'
						background='transparent'
						color='#000'
						height='50px'
						width='260px'
						onClick={() => setIsChoosingCategory(true)}>
						Категории
					</Button>
				) : (
					<div className='category-sort-buttons'>
						{categories.map((category, index) => (
							<Button
								className='category-button'
								key={index}
								color='rgb(0, 0, 0)'
								background='transparent'
								width='120px'
								height='44px'
								onClick={() => sortProductsByCategory(category)}>
								{category}
							</Button>
						))}
					</div>
				)}
			</div>
			{(isChoosingSortType || isChoosingCategory) && (
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

	& .sort-icon {
		display: flex;
		align-self: center;
	}

	& .category-sort-buttons {
		display: flex;
	}
	& .choice-cost-sort-buttons {
		display: flex;
		gap: 5px;
	}

	& .choice-cost-sort-button {
		padding: 5px;
		border: 1px solid rgb(211, 211, 211);
		display: flex;
		align-self: center;
		transition: border 0.5s;
	}
	& .choice-cost-sort-button:hover {
		border: 1px solid rgb(121, 121, 121);
	}

	& .category-button {
		display: flex;
		align-self: center;
		font-weight: 600;
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
		display: flex;
		align-self: center;
		transition: border 0.5s;
	}
	& .sort-button:hover {
		border: 1px solid rgb(121, 121, 121);
	}

	& .reset-button {
		margin: 0 auto;
		transition: color 0.5s;
	}

	& .reset-button:hover {
		color: rgb(199, 199, 199);
	}
`
