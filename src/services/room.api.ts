import { IRooms } from '@/components/view/RoomManager/types';

import { ServiceApi } from './api';
import { isSuccess } from './api.util';

import { message } from 'antd';

export const getRooms = async (): Promise<IRooms> => {
	try {
		const res: any = await ServiceApi.getRooms({
			filter: {
				limit: 20,
				offset: 0,
				order: 'id DESC',
			},
		});
		if (isSuccess(res)) return res?.data;
		message.error('get room failed');
		return [];
	} catch (error) {
		message.error('get room failed');
		return [];
	}
};

export const deleteRoom = async ({
	id,
	onSuccess,
}: {
	id: number;
	onSuccess?: () => void;
}) => {
	try {
		const res: any = await ServiceApi.deleteRoom(id);
		if (isSuccess(res)) {
			message.success('xoá thành công');
			onSuccess?.();
			return;
		}
		message.error('Xoá thất bại');
	} catch (error) {
		message.error('Xoá thất bại');
	}
};
