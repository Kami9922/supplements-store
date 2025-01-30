import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { userReducer } from './reducers/user-reducer'
import { appReducer } from './reducers/app-reducer'
import { modalReducer } from './reducers/modal-reducer'
import { productsReducer } from './reducers/products-reducer'
import { productReducer } from './reducers/product-reducer'
import { cartReducer } from './reducers/cart-reducer'
import { categoriesReducer } from './reducers/categories-reducer'

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	products: productsReducer,
	product: productReducer,
	modal: modalReducer,
	cart: cartReducer,
	categories: categoriesReducer,
})

export const store = createStore(
	reducer,
	composeEnchancers(applyMiddleware(thunk))
)
