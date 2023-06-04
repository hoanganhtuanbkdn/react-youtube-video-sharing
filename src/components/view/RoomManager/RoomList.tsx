import { NOOP } from '@/constants';
import { getRooms } from '@/services/room.api';
import React, { memo, useEffect } from 'react';
import { useQuery } from 'react-query';

import { IRoom } from './types';

interface IRoomListProps {}
export let refetchGetRooms: any;
const RoomList = ({}: IRoomListProps) => {
	const { data, refetch } = useQuery('rooms', getRooms);

	useEffect(() => {
		refetchGetRooms = refetch;
		return () => {
			refetchGetRooms = NOOP;
		};
	}, []);
	return (
		<div className="col mt-6 gap-4">
			{data?.map((v: IRoom) => {
				return (
					<div
						key={v?.id}
						className="ease relative cursor-pointer rounded-[10px] bg-white p-2 transition-all hover:-right-[1px] hover:-top-[1px] hover:shadow-lg"
					>
						<div className="text-base font-bold">{v?.name}</div>
						<div className="pl-4 text-sm font-normal italic text-black-3">
							{v?.description}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default memo(RoomList);
