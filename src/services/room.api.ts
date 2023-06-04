import { IRooms } from '@/components/view/RoomManager/types';
import { showToastError } from '@/config/toast.config';

import { ServiceApi } from './api';

export const getRooms = async (): Promise<IRooms> => {
	try {
		const res: any = await ServiceApi.getRooms({
			filter: {
				limit: 20,
				offset: 0,
				order: 'id DESC',
			},
		});
		if (res?.ok) return res?.data;
		showToastError('get room failed');
		return [];
	} catch (error) {
		showToastError();
		return [];
	}
};
