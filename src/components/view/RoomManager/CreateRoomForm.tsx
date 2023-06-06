import { ICreateRoomParams, ServiceApi } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import React, { memo, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { Button, Col, Drawer, Form, Input, message, Row, Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const CreateRoomForm: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();
	const queryClient = useQueryClient();

	const showDrawer = useCallback(() => {
		setOpen(true);
	}, []);
	const onClose = useCallback(() => {
		setOpen(false);
		form.resetFields();
	}, []);

	const onFinish = useCallback(async (values: ICreateRoomParams) => {
		try {
			const res = await ServiceApi.createRoom(values);
			if (res?.ok) {
				form.resetFields();
				message.success('Tạo thành công!');
				queryClient.refetchQueries('rooms');
				return;
			}
			message.error('Tạo thất bại!');
		} catch (error) {
			alert(error);
		}
	}, []);

	return (
		<>
			<div className="flex items-center justify-between">
				<div className="font-bold">Quản lý phòng nhạc</div>
				<Button
					type="primary"
					onClick={showDrawer}
					icon={<PlusOutlined />}
				>
					Tạo phòng nhạc mới
				</Button>
			</div>
			<Drawer
				title="Create new room"
				width={720}
				onClose={onClose}
				open={open}
				bodyStyle={{ paddingBottom: 80 }}
			>
				<Form
					form={form}
					onFinish={onFinish}
					layout="vertical"
					// initialValues={{ name: 'namename' }}
				>
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
							Tạo
						</Button>
					</div>
				</Form>
			</Drawer>
		</>
	);
};

export default memo(CreateRoomForm);
