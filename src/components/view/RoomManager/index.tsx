import React, { useCallback, useEffect, useState } from 'react';

import CreateRoomForm from './CreateRoomForm';
import RoomList from './RoomList';
import { IRoom } from './types';

import { Form } from 'antd';

const RoomManager: React.FC = () => {
	const [detail, setDetail] = useState({} as IRoom);
	const [form] = Form.useForm();
	const [open, setOpen] = useState(false);

	const showDrawer = useCallback((detail?: IRoom) => {
		setOpen(true);
		setDetail(detail || {});
	}, []);
	const onClose = useCallback(() => {
		setOpen(false);
		form.resetFields();
	}, []);

	useEffect(() => {
		const initialValues = {
			name: detail?.name,
			description: detail?.description,
			acceptRole: detail?.acceptRole,
		};
		form.setFieldsValue(initialValues);
	}, [form, detail]);
	return (
		<div className="mb-5 mt-10 rounded-[10px] bg-slate-2 p-10 text-base">
			<CreateRoomForm
				form={form}
				isOpen={open}
				showDrawer={showDrawer}
				onClose={onClose}
				detail={detail}
			/>
			<RoomList showDrawer={showDrawer} />
		</div>
	);
};

export default RoomManager;
