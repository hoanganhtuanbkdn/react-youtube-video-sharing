import { useCallback, useEffect, useMemo } from 'react';

import useEventListener from './useEventListener';
import useMergingState from './useMergingState';

import { isNotNilOrEmpty } from 'ramda-adjunct';

export const getCachedData = (initData: any, key?: string) => {
	if (!key || isNotNilOrEmpty(initData) || typeof window === 'undefined')
		return initData;

	try {
		const item = window.sessionStorage.getItem(key);
		return item ? JSON.parse(item) : initData;
	} catch (error) {
		console.warn(`Error reading sessionStorage key “${key}”:`, error);
		return initData;
	}
};

export const setCacheData = (key: string, value: any) => {
	if (!key) return;
	if (typeof window === 'undefined') {
		return;
	}

	window.sessionStorage.setItem(key, JSON.stringify(value));
};

interface IOut<T> {
	data: T[] | null;
	count: number;
	loading: boolean;
	firstLoading: boolean;
	refetch: () => void;
}
function useLoadMoreOnScroll<T = any>(
	fetchData: (params: any) => Promise<{ data: T[]; count: number }>,
	options: {
		wrapListId: string; // need for load more feature
		defaultData?: T[] | { data: T[] }; // default data if has
		q?: string | number; // use for load more with searching or add dependencies for refetch data when dependencies changes
		withAuth?: boolean; // use for this apis need authentication
		key?: string; // use for update list data after remove a data successfully
		skip?: boolean; //
	}
): IOut<T> {
	const {
		defaultData = null,
		q,
		wrapListId,
		withAuth,
		skip,
		key,
	} = options || {};

	// Recall api after logged for update interactive's status. Example: Community
	const cache = getCachedData(defaultData, key); // Use session storage for optimize speed display the data

	const [state, setState] = useMergingState({
		data: cache?.data,
		loading: true,
		count: cache?.count,
	});

	const { loading, data, count } = state;
	const firstLoading = useMemo(() => !data && loading, [data, loading]);

	const getMoreData = useCallback(async () => {
		if (skip) return;
		if (!loading && data?.length && data?.length < count) {
			setState({
				loading: true,
			});
			const newData = await fetchData({
				offset: data?.length,
				limit: 10,
			});

			if (newData?.data) {
				setState((prevData) => ({
					loading: false,
					data: [...(prevData?.data || []), ...newData?.data],
					count: newData.count,
				}));
			} else {
				setState({
					loading: false,
				});
			}
		}
	}, [loading, data, count, skip]);

	const getFirstData = useCallback(async () => {
		if (skip) return;
		const newData = await fetchData({
			offset: 0,
			limit: 10,
		});

		if (key) {
			setCacheData(key, {
				data: newData?.data,
				count: newData?.count || 0,
			});
		}

		setState({
			loading: false,
			data: newData?.data,
			count: newData?.count || 0,
		});
	}, [q, skip]);

	const handleScrollLoadMore = useCallback(() => {
		const list: any = document.getElementById(wrapListId);

		if (
			window.scrollY + window.innerHeight >
			list.clientHeight + list.offsetTop - 100
		) {
			getMoreData();
		}
	}, [getMoreData]);

	useEventListener('scroll', handleScrollLoadMore);

	useEffect(() => {
		getFirstData();
	}, [q, skip]);

	return {
		data,
		loading,
		firstLoading,
		refetch: getFirstData,
		count,
	};
}

export default useLoadMoreOnScroll;
