import React from 'react';

import { Button, Form, Input } from 'antd';

export default function ShareForm({
	onFinish,
	loading,
}: {
	onFinish: (values: any) => void;
	loading: boolean;
}) {
	return (
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
				<Input
					id="videoUrl"
					data-testid="videoUrl"
					autoComplete="off"
				/>
			</Form.Item>

			<div className="row w-full justify-end gap-5">
				<Button
					type="primary"
					data-testid="submitShareBtn"
					className="submitShareBtn"
					htmlType="submit"
					loading={loading}
				>
					Share
				</Button>
			</div>
		</Form>
	);
}
