import { ICreateRoomParams } from './../../../services/api.type';

export type ICreateRoomValue = Pick<
	ICreateRoomParams,
	'name' | 'description' | 'acceptRole'
>;

export interface IRoom {
	id?: number;
	name?: string;
	description?: string;
	acceptRole?: number;
	createdAt?: string;
	ownerId?: string | number;
}

export type IRooms = IRoom[];
