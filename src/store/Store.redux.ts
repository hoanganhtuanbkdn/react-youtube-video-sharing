import { configureStore } from '@reduxjs/toolkit';

import { AuthReducer } from './Auth/Auth.redux';
import { GeneralReducer } from './General';
import { ProfileReducer } from './Profile';
import { persistConfig } from './Store.persist';
import rootSaga from './Store.saga';

import { combineReducers } from 'redux';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

const rootReducer = combineReducers({
	auth: AuthReducer,
	profile: ProfileReducer,
	general: GeneralReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}).concat(sagaMiddleware),
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { persistor, store };
