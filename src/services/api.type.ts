export interface IUser {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	roles?: string[];
}

export interface ISharing {
	id?: number;
	videoUrl: string;
	title?: string;
	description?: string;
	userId?: number;
	createdAt?: string;
	cover?: string;
	user?: IUser;
}

export interface ICreateRoomParams {
	name?: string;
	description?: string;
	acceptRole?: number;
	createdAt: string;
	ownerId?: number;
}
