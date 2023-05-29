import { AuthActions, AuthSelector, GlobalDispatch } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';

import { Button, Form, Input, Modal } from 'antd';

const AuthModal: React.FC<{}> = () => {
	const { fetching, isShowAuthModal, authModalType } = useSelector(
		AuthSelector.selectAuthState
	);
	const onClose = () => {
		GlobalDispatch(AuthActions.setShowAuthModal({ status: false }));
	};

	const onFinish = (values: any) => {
		console.log('Success:', values);

		if (authModalType === 'LOGIN') {
			GlobalDispatch(AuthActions.loginRequest(values));
			return;
		}

		GlobalDispatch(AuthActions.registerRequest(values));
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const isLogin = authModalType === 'LOGIN';
	return (
		<Modal
			open={isShowAuthModal}
			title={isLogin ? 'Login' : 'Register'}
			onCancel={onClose}
			footer={[]}
		>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ email: '', password: '' }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="new-password"
			>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: 'Please input your email!',
						},
						{ type: 'email' },
					]}
				>
					<Input autoComplete="off" />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password autoComplete="off" />
				</Form.Item>

				<div className="row w-full justify-end gap-5">
					<Button type="primary" danger onClick={onClose}>
						Cancel
					</Button>
					<Button type="primary" htmlType="submit" loading={fetching}>
						Submit
					</Button>
				</div>
			</Form>
		</Modal>
	);
};

export default AuthModal;
