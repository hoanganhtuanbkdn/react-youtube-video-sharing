import { jsonParse } from './Common.util';

import { ApiResponse } from 'apisauce';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import CryptoJS from 'crypto-js';

export enum KEY_AUTH_COOKIES {
	ACCESS_TOKEN = 'ACCESS_TOKEN',
	APP = '_app',
}
const NEXT_PUBLIC_COOKIE_KEY = 'ec0shar32023';
export const isSuccess = <T = any>(res: ApiResponse<T> & any) => {
	return res.ok && (res.status === 200 || res.status === 204);
};
function addDays(numOfMonths: number, date = new Date()) {
	date.setDate(date.getDate() + numOfMonths);

	return date;
}

export const setAuthCookie = ({ token }: { token: string }) => {
	const data = JSON.stringify({
		[KEY_AUTH_COOKIES.ACCESS_TOKEN]: token,
	});

	const expireData = addDays(1);

	setCookie(KEY_AUTH_COOKIES.APP, encryptCookie(data), {
		expires: expireData,
		maxAge: 60 * 60 * 24 * 30,
	});
};
export const encryptCookie = (data: string) => {
	var cipherText = CryptoJS.AES.encrypt(
		data,
		NEXT_PUBLIC_COOKIE_KEY as string
	).toString();
	return cipherText;
};
export const decryptCookie = () => {
	try {
		const app = getCookie(KEY_AUTH_COOKIES.APP) || '';

		const bytes = CryptoJS.AES.decrypt(
			app as string | CryptoJS.lib.CipherParams,
			NEXT_PUBLIC_COOKIE_KEY as string
		);

		const originalText = bytes?.toString(CryptoJS.enc.Utf8);

		return originalText;
	} catch (error) {
		return {};
	}
};
export function deleteCookieAfterLogout() {
	deleteCookie(KEY_AUTH_COOKIES.APP);
}

export const getAccessToken = () => {
	const cookie = decryptCookie();

	const obj = jsonParse(cookie);

	const token = obj[KEY_AUTH_COOKIES.ACCESS_TOKEN];

	return token;
};
