import { ICreateRoomParams, ServiceApi } from '@/services';
import { isSuccess } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import React, { memo, useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { IRoom } from './types';

import { Button, Col, Drawer, Form, Input, message, Row, Select } from 'antd';
import { isNotNilOrEmpty } from 'ramda-adjunct';

const { Option } = Select;
const { TextArea } = Input;

const CreateRoomForm = ({
	form,
	showDrawer,
	onClose,
	isOpen,
	detail,
}: {
	form: any;
	showDrawer: (detail: IRoom) => void;
	onClose: () => void;
	isOpen: boolean;
	detail: IRoom;
}) => {
	const queryClient = useQueryClient();
	const onFinish = useCallback(
		async (values: ICreateRoomParams) => {
			try {
				if (isNotNilOrEmpty(detail)) {
					const res = await ServiceApi.updateRoom(
						Number(detail?.id),
						values
					);
					if (isSuccess(res)) {
						form.resetFields();
						message.success('Sửa thành công!');
						queryClient.refetchQueries('rooms');
						onClose();
						return;
					} else {
						message.error('Sửa thất bại!');
					}
				}
				const res = await ServiceApi.createRoom(values);
				if (isSuccess(res)) {
					form.resetFields();
					message.success('Tạo thành công!');
					queryClient.refetchQueries('rooms');
					return;
				}
				message.error('Tạo thất bại!');
			} catch (error) {
				alert(error);
			}
		},
		[detail]
	);

	return (
		<>
			<div className="flex items-center justify-between">
				<div className="font-bold">Quản lý phòng nhạc</div>
				<Button
					type="primary"
					onClick={() => showDrawer({})}
					icon={<PlusOutlined />}
				>
					Tạo phòng nhạc mới
				</Button>
			</div>
			<Drawer
				title="Create new room"
				width={720}
				onClose={onClose}
				open={isOpen}
				bodyStyle={{ paddingBottom: 80 }}
			>
				<Form form={form} onFinish={onFinish} layout="vertical">
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="name"
								label="Tên phòng"
								rules={[
									{
										required: true,
										message: 'Bắt buộc',
									},
								]}
							>
								<Input placeholder="Nhập tên phòng" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="acceptRole"
								label="Xác nhận tham gia phòng"
							>
								<Select placeholder="Please select an owner">
									<Option value={0}>Admin</Option>
									<Option value={1}>All Member</Option>
									<Option value={2}>Auto</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="description"
								label="Mô tả"
								rules={[
									{
										required: true,
										message: 'Bắt buộc',
									},
								]}
							>
								<TextArea
									style={{ width: '100%' }}
									placeholder="Nhập mô tả"
									rows={5}
								/>
							</Form.Item>
						</Col>
					</Row>
					<div className="flex gap-4">
						<Button onClick={onClose}>Huỷ</Button>
						<Button type="primary" htmlType="submit">
							{detail?.id ? 'Lưu chỉnh sửa' : 'Tạo'}
						</Button>
					</div>
				</Form>
			</Drawer>
		</>
	);
};

export default memo(CreateRoomForm);
