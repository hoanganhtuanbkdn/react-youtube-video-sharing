import Popconfirm from '@/components/ui/PopConfirm';
import { deleteRoom, getRooms } from '@/services/room.api';
import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
import React, { memo, useCallback } from 'react';
import { useQuery } from 'react-query';

import { IRoom } from './types';

import { Empty } from 'antd';
import { isNilOrEmpty } from 'ramda-adjunct';

interface IRoomListProps {
	showDrawer: (detail?: IRoom) => void;
}
const RoomList = ({ showDrawer }: IRoomListProps) => {
	const { data, isFetching, refetch } = useQuery('rooms', getRooms);
	const onDelete = useCallback((id?: number | string) => {
		deleteRoom({
			id: Number(id),
			onSuccess: () => {
				refetch();
			},
		});
	}, []);

	const onEditRoom = useCallback((detail: IRoom) => {
		showDrawer(detail);
	}, []);

	if (isFetching && isNilOrEmpty(data))
		return (
			<Empty
				image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
				imageStyle={{ height: 60 }}
				description={'Bạn chưa tạo phòng'}
			/>
		);

	return (
		<div className="col mt-6 gap-4">
			{data?.map((v: IRoom) => {
				return (
					<div
						key={v?.id}
						className="ease group relative flex cursor-pointer items-center justify-between rounded-[10px] bg-white p-2 transition-all hover:-right-[1px] hover:-top-[1px] hover:shadow-lg"
					>
						<div>
							<div className="text-base font-bold">{v?.name}</div>
							<div className="pl-4 text-sm font-normal italic text-black-3">
								{v?.description}
							</div>
						</div>
						<div className="center gap-3">
							<div>
								<Popconfirm
									onOk={() => onDelete(v.id)}
									text="Bạn có muốn xoá"
									description=""
								>
									<CloseCircleOutlined className="w-[12px]" />
								</Popconfirm>
							</div>
							<EditOutlined
								className="w-[12px]"
								onClick={() => onEditRoom(v)}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default memo(RoomList);
