import SmartLink from '@/components/SmartLink';
import { ROUTERS } from '@/constant';
import { AuthActions, GlobalDispatch, ProfileSelectors } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';

import AuthModal from '../AuthModal';

import { Button } from 'antd';

export default function Header() {
	const profile = useSelector(ProfileSelectors.selectProfile);

	const onShowModal = (isRegister: boolean) => {
		GlobalDispatch(
			AuthActions.setShowAuthModal({
				status: true,
				type: isRegister ? 'REGISTER' : 'LOGIN',
			})
		);
	};

	const onLogout = () => {
		GlobalDispatch(AuthActions.logoutRequest());
	};

	return (
		<div className=" sticky  top-0 z-40 h-[90px] bg-white shadow">
			<div className="row-between container">
				<div>
					<h1>Funny Movie</h1>
				</div>
				{profile?.id ? (
					<div className="row gap-4">
						<p>Welcome {[profile?.email]}</p>
						<SmartLink href={ROUTERS.SHARE}>
							<Button type="primary">Share a movie</Button>
						</SmartLink>
						<Button onClick={onLogout}>Logout</Button>
					</div>
				) : (
					<div className="row gap-4">
						<Button
							type="primary"
							onClick={() => onShowModal(false)}
						>
							Login
						</Button>
						<Button onClick={() => onShowModal(true)}>
							Register
						</Button>
						<AuthModal />
					</div>
				)}
			</div>
		</div>
	);
}
