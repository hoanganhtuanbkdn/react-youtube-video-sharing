import { useCallback, useEffect, useRef, useState } from 'react';

import useEventListener from './useEventListener';

import { isNilOrEmpty, isNotNilOrEmpty } from 'ramda-adjunct';

function useApiWithLoadMore<T = any>(
	fetchData: (params: any) => Promise<{ data: any[]; count: number }>,
	wrapListId: string,
	options?: {
		defaultData?: T[];
		q?: string;
		logged?: boolean;
	}
): [T[], boolean, boolean, () => void] {
	const { defaultData = [], q, logged } = options || {};
	const resCount = useRef(1000);
	const [data, setData] = useState((defaultData as T[]) || []);
	const [loading, setLoading] = useState(true);
	const [firstLoading, setFirstLoading] = useState(true);

	const getMoreData = async () => {
		if (!loading && data.length < resCount.current) {
			setLoading(true);
			const newData = await fetchData({
				offset: data.length,
			});

			if (newData?.data) {
				setData((prevData) => [...prevData, ...newData?.data]);
				setLoading(false);
				resCount.current = newData?.count;
			}
		}
	};
	const getFirstData = useCallback(async () => {
		const newData = await fetchData({
			offset: 0,
		});
		setData(newData?.data);
		setFirstLoading(false);
		setLoading(false);
		resCount.current = newData?.count;
	}, [q, logged]);

	const handleScrollLoadMore = () => {
		const list: any = document.getElementById(wrapListId);
		if (
			window.scrollY + window.innerHeight ===
			list.clientHeight + list.offsetTop
		) {
			getMoreData();
		}
	};
	useEventListener('scroll', handleScrollLoadMore);
	useEffect(() => {
		if (isNilOrEmpty(logged) || (isNotNilOrEmpty(logged) && logged) || q) {
			getFirstData();
		}
	}, [logged, q]);
	//use loading when loadMore
	return [data, loading, firstLoading, getFirstData];
}

export default useApiWithLoadMore;
