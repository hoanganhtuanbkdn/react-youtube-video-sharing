import { ICreateRoomParams } from './../../../services/api.type';

export type ICreateRoomValue = Pick<
	ICreateRoomParams,
	'name' | 'description' | 'acceptRole'
>;
