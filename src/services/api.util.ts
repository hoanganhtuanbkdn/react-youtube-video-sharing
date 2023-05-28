import { ServiceApi } from "./api";
import { AnyObject, Filter } from './loopback.type';

import apisauce, { ApiResponse } from 'apisauce';
import { reject } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

export const setApiAuthorization = (token: string) => {
	ServiceApi.api.setHeaders({
		authorization: 'Bearer ' + token,
	});
};

export const removeToken = () => {
	ServiceApi.api.deleteHeader('authorization');
};
export const isSuccess = <T = any>(res: ApiResponse<T> & any) => {
	return res.ok && (res.status === 200 || res.status === 204);
};

export const removeNullOrEmpty = (obj: AnyObject) => {
	return reject(isNilOrEmpty)(obj);
};
