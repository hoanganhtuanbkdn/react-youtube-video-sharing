import React from 'react';

import { Button, Card, Form, Input } from 'antd';

export default function ShareForm({
	onFinish,
	loading,
}: {
	onFinish: (values: any) => void;
	loading: boolean;
}) {
	return (
		<Card title="Share a Youtube movie" className="w-[400px]">
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ videoUrl: '' }}
				onFinish={onFinish}
				autoComplete="new-password"
			>
				<Form.Item
					label="Youtube URL"
					name="videoUrl"
					rules={[
						{
							required: true,
							message: 'Please input a Youtube url!',
						},
					]}
				>
					<Input autoComplete="off" />
				</Form.Item>

				<div className="row w-full justify-end gap-5">
					<Button type="primary" htmlType="submit" loading={loading}>
						Share
					</Button>
				</div>
			</Form>
		</Card>
	);
}
