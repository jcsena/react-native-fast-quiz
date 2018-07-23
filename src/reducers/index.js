import { createStore, applyMiddleware } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/es/storage';
import rootRedux from './rootRedux';

let middleware = [thunk];

const config = {
	key: 'root',
	storage,
	blacklist: ['nav']
};

const reducer = persistCombineReducers(config, rootRedux);


if (__DEV__) { // eslint-disable-line
	const logger = require('redux-logger').createLogger(); // eslint-disable-line
	middleware = [...middleware, logger.__esModule ? logger.default : logger];
} else {
	middleware = [...middleware];
}

export default function configureStore(initialState) {
	return createStore(
		reducer,
		initialState,
		applyMiddleware(...middleware)
	);
}
