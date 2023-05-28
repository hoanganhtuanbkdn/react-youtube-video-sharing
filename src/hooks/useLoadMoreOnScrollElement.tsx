import { useCallback, useEffect, useMemo } from 'react';

import useEventListenerV2 from './useEventListener';
import useMergingState from './useMergingState';

interface IOut<T> {
	data: T[] | null;
	loading: boolean;
	firstLoading: boolean;
	refetch: () => void;
	removeData: (item: T) => void;
	updateData: (item: T, data: Partial<T>) => void;
}
function useLoadMoreOnScrollElement<T = any>(
	fetchData: (params: any) => Promise<{ data: T[]; count: number }>,
	options: {
		wrapListId: string; // need for load more feature
		defaultData?: T[]; // default data if has
		q?: string; // use for load more with searching
		withAuth?: boolean; // use for this apis need authentication
	}
): IOut<T> {
	// Recall api after logged for update interactive's status. Example: Community

	const { defaultData = null, q, wrapListId, withAuth } = options || {};
	const [state, setState] = useMergingState({
		data: defaultData,
		loading: true,
		count: 1000,
	});

	const { loading, data, count } = state;
	const firstLoading = useMemo(() => !data && loading, [data, loading]);

	const list: any = document.getElementById(wrapListId);

	// Use for update data feature. Call this function after updated successfully
	const updateData = useCallback((item: T, data: Partial<T>) => {
		setState((prev) => {
			return {
				...prev,
				data: prev.data?.map((i) => ({
					...i,
					...(i === item && {
						...item,
						...data,
					}),
				})),
			};
		});
	}, []);

	// Use for delete data feature. Call this function after deleted successfully
	const removeData = useCallback((item: T) => {
		setState((prev) => {
			return {
				...prev,
				data: prev.data?.filter((i) => i !== item),
			};
		});
	}, []);

	const getMoreData = async () => {
		if (!loading && data?.length && data?.length < count) {
			setState({
				loading: true,
			});
			const newData = await fetchData({
				offset: data?.length,
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
	};
	const getFirstData = useCallback(async () => {
		const newData = await fetchData({
			offset: 0,
		});
		setState({
			loading: false,
			data: newData?.data,
			count: newData?.count || 0,
		});
	}, [q]);

	const handleScrollLoadMore = () => {
		if (list.offsetHeight + list.scrollTop > list.scrollHeight - 100) {
			getMoreData();
		}
	};

	useEventListenerV2('scroll', handleScrollLoadMore, list);

	useEffect(() => {
		if (withAuth) {
			return;
		}

		getFirstData();
	}, [q]);

	return {
		data,
		loading,
		firstLoading,
		refetch: getFirstData,
		removeData,
		updateData,
	};
}

export default useLoadMoreOnScrollElement;
