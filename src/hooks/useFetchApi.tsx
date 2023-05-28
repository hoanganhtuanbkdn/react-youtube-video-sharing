import { useCallback, useEffect, useRef, useState } from 'react';

import { parseJSON } from './useSessionStorage';

interface IUseFetch<T> {
	data: T;
	loading: boolean;
	fetchData: () => void;
	error: string;
}

const getCachedData = (initData: any, key?: string) => {
	if (!key) return initData;
	// Prevent build error "window is undefined" but keep keep working
	if (typeof window === 'undefined') {
		return initData;
	}

	try {
		const item = window.sessionStorage.getItem(key);
		return item ? parseJSON(item) : initData;
	} catch (error) {
		console.warn(`Error reading sessionStorage key “${key}”:`, error);
		return initData;
	}
};

const setCacheData = (key: string, value: any) => {
	if (!key) return;
	if (typeof window === 'undefined') {
		return;
	}

	window.sessionStorage.setItem(key, JSON.stringify(value));
};

const useFetchApi = <T,>(
	query: (filter?: any) => void,
	deps?: any[],
	options?: {
		key?: string;
		initData?: any;
		skip?: boolean; // Sometime, we need the query value from router for get data so the hook need a flag for wait it's available
	}
): IUseFetch<T> => {
	const { initData, key, skip } = options || {};

	const cache = getCachedData(initData, key); // Use session storage for optimize speed display the data
	const ref = useRef(false); // Use ref loading for optimize the number of renders.
	const logged = false; // Refetch data with user information when logged or logout
	const [data, setData] = useState<T>((cache || null) as T);
	const [error, setError] = useState<string>(null as unknown as string);

	const fetchData = useCallback(async () => {
		if (skip) return;
		try {
			if (!ref.current) {
				ref.current = true;
				const res: any = await query();

				if (res) {
					setData(res);
					if (key) {
						setCacheData(key, res);
					}
				} else {
					setError(res?.error || 'error');
				}
				ref.current = false;
			}
		} catch (error) {
			// setError(handleError(error));
		}
	}, [logged, skip, ...(deps || [])]);

	useEffect(() => {
		fetchData();
	}, [logged, ...(deps || [])]);

	return { data, loading: !data && !error, fetchData, error };
};

export default useFetchApi;
