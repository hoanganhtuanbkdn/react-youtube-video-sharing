export interface IUser {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
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
