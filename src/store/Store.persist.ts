import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// https://github.com/vercel/next.js/discussions/15687
const createNoopStorage = () => {
	return {
		getItem(_key: string) {
			return Promise.resolve(null);
		},
		setItem(_key: string, value: any) {
			return Promise.resolve(value);
		},
		removeItem(_key: string) {
			return Promise.resolve();
		},
	};
};

const storage =
	typeof window !== 'undefined'
		? createWebStorage('local')
		: createNoopStorage();

export const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['general'],
};
