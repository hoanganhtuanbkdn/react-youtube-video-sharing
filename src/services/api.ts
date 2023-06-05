import { defaultFilter } from './api.constant';
import { ICreateRoomParams, IGetRooms, ISharing, IUser } from './api.type';
import { isSuccess } from './api.util';
import { Filter } from './loopback.type';

import apisauce from 'apisauce';

export const isDev = process.env.NODE_ENV === 'development';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;
// export const baseURL = isDev
// 	? 'http://localhost:5000'
// 	: process.env.NEXT_PUBLIC_API_URL;

export const defaultApiSauceConfig = (headers?: any) => {
	return {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...headers,
		},
		timeout: 10000,
	};
};

const createServiceApi = () => {
	const api = apisauce.create({
		...defaultApiSauceConfig(),
		baseURL: baseURL,
	});

	const login = async (data?: { email: string; password: string }) =>
		api.post('/login', data);

	const register = async (data?: { email: string; password: string }) =>
		api.post('/register', data);

	const getUserMe = async () => api.get<IUser>('/users/me');

	const getSharing = async (filter?: Filter) => {
		const res: any = await api.get<{ data: ISharing[]; count: number }>(
			'/sharings',
			filter ? { filter } : defaultFilter
		);

		if (isSuccess(res)) {
			return res?.data;
		}

		return {
			data: [],
			count: 0,
		};
	};

	const createSharing = async (data?: ISharing) => {
		return await api.post<ISharing>('/sharings', data);
	};

	const deleteSharingById = async (id: number) => {
		return await api.delete('/sharings/' + id);
	};

	//room
	const createRoom = async (params: ICreateRoomParams) => {
		return await api.post('/rooms/', params);
	};
	const getRooms = async (params: IGetRooms) => {
		return await api.get('/rooms', params);
	};

	const deleteRoom = async (id: number) => {
		return await api.get('/rooms/' + id);
	};

	return {
		api,
		login,
		register,
		getUserMe,
		getSharing,
		createSharing,
		deleteSharingById,

		//room
		createRoom,
		getRooms,
		deleteRoom,
	};
};

export const ServiceApi = createServiceApi();
