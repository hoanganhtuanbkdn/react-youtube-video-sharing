import SmartLink from '@/components/SmartLink';
import { ROUTERS } from '@/constant';
import { AuthActions, GlobalDispatch, ProfileSelectors } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';

import AuthModal from '../AuthModal';

import { Button } from 'antd';
import { useRouter } from 'next/router';

export default function Header() {
	const profile = useSelector(ProfileSelectors.selectProfile);
	const router = useRouter();
	const onShowModal = (isRegister: boolean) => {
		GlobalDispatch(
			AuthActions.setShowAuthModal({
				status: true,
				type: isRegister ? 'REGISTER' : 'LOGIN',
			})
		);
	};

	const onLogout = () => {
		GlobalDispatch(AuthActions.logoutRequest(router));
	};

	return (
		<div className=" sticky top-0 z-40 h-[90px] bg-white shadow">
			<div className=" container ">
				<div className="row-between px-3 md:px-0">
					<h1>Funny Movie</h1>
					{profile?.id ? (
						<div className="col md:row text-xs md:gap-4 md:text-base">
							<p>Welcome {[profile?.email]}</p>
							<div className="row nd:gap-4 gap-2">
								<SmartLink href={ROUTERS.SHARE}>
									<Button type="primary">
										Share a movie
									</Button>
								</SmartLink>
								<Button onClick={onLogout}>Logout</Button>
							</div>
						</div>
					) : (
						<div className="row nd:gap-4 gap-2">
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
		</div>
	);
}
