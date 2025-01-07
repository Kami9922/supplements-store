import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { userReducer } from './reducers/user-reducer'
import { appReducer } from './reducers/app-reducer'

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
})

export const store = createStore(
	reducer,
	composeEnchancers(applyMiddleware(thunk))
)
