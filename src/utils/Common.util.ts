import { ROUTERS } from '@/constant';

import CryptoJS from 'crypto-js';
import moment from 'moment';
import { equals, reject } from 'ramda';
import { isArray, isNilOrEmpty } from 'ramda-adjunct';

export enum KEY_CODE {
	ENTER = 13,
	ARROW_UP = 38,
	ARROW_DOWN = 40,
	BACK_SPACE = 8,
	DIGIT_0 = 48,
	TAB = 9,
	ESC = 27,
}

export type HandlerType<S extends { [key: string]: any }> = {
	[Property in keyof S]: ReturnType<S[Property]>;
};

export const classNames = (...classes: any) => {
	return classes.filter(Boolean).join(' ');
};

export const insertIf = (condition: boolean, ...elements: any[]) => {
	return condition ? [...elements] : [];
};

export const insertObjectIf = (
	condition: boolean | any,
	elements1: any,
	elements2?: any
) => {
	return condition ? elements1 : elements2 ?? {};
};
export const insertObjectIfV2 = <T1 extends {}>(
	condition: boolean | any,
	elements1: T1
): Partial<T1> => {
	return condition ? elements1 : ({} as T1);
};

export const insertObjectIfElse = <T1, T2>(
	condition: boolean,
	elements1: T1,
	elements2: T2
): Partial<T1 | T2> => {
	return condition ? elements1 : elements2;
};

export const generateUUID = () => {
	const n = CryptoJS.MD5(
		moment.utc().add(7, 'day').toISOString() + Math.random()
	).toString();

	return n;
};

export const getDiffDays = (startDate: string, endDate: string) => {
	return moment(endDate).diff(moment(startDate), 'days');
};

export const replaceKeys = (
	text: string,
	keys: { param: string; value: number | string }[]
) => {
	let finalText = text;

	keys.map((key: { param: string; value: number | string }) => {
		finalText = finalText.replace(key.param, String(key.value));
		finalText = finalText.replace(key.param, String(key.value));
	});
	return finalText;
};

export const removeNullObj = (obj: any) => {
	return reject(equals(null))(obj);
};

export const jsonParse = (data: any): any => {
	try {
		return typeof data === 'object' ? data : JSON.parse(data || '{}') || {}; // JSON.parse maybe crash app
	} catch {
		return {};
	}
};

export const mapV2 = <T, S>(
	input: T[] | undefined,
	callback: (value: T, index: number, array: T[]) => S
): S[] => {
	if (!isArray(input)) return [];
	return input.map(callback);
};

export const arrayToJson = <T>(
	array: any[] = [],
	key: string = 'id'
): {
	[key: string]: T;
} => {
	try {
		if (isNilOrEmpty(array)) return {};

		const result: any = {};
		for (const item of array) {
			result[item[key]] = item;
		}

		return result;
	} catch {
		return {};
	}
};

export const capitalizeFirstLetter = (type: string) => {
	return type?.charAt(0)?.toUpperCase() + type?.slice(1);
};

export const onEnterKeyCondition = (
	evt: React.KeyboardEvent<HTMLElement>,
	onEnter?: () => void
) => {
	if (
		!!onEnter &&
		(evt?.keyCode === KEY_CODE.ENTER || evt?.which === KEY_CODE.ENTER) &&
		!evt?.shiftKey
	) {
		evt?.preventDefault();
		onEnter();
	}
};

export const validURL = (str: string) => {
	const pattern = new RegExp(
		'^(https?:\\/\\/)' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[^\\s\t\n]*)*(\\?[^\\s\t\n]*)?(\\#[^\\s\t\n]*)?$',
		'i'
	);

	return !!pattern.test(str);
};

export const checkMatchRouter = (
	pathname: string,
	route: string | string[]
) => {
	if (isArray(route)) {
		const shouldActive = route.find((item) => {
			return (
				(equals(pathname, item) && item !== ROUTERS.HOME) ||
				(item === ROUTERS.HOME && pathname === item)
			);
		});
		return !!shouldActive;
	}

	return (
		(equals(pathname, route) && route !== ROUTERS.HOME) ||
		(route === ROUTERS.HOME && pathname === route)
	);
};
