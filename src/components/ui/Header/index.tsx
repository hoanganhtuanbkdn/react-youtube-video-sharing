import SmartLink from '@/components/SmartLink';
import { ROUTERS } from '@/constants';
import { AuthActions, GlobalDispatch, ProfileSelectors } from '@/store';
import { classNames } from '@/utils';
import React from 'react';
import { useSelector } from 'react-redux';

import AuthModal from '../AuthModal';

import { Button } from 'antd';
import { useRouter } from 'next/router';

export default function Header({
	isConnected,
	isProfile,
}: {
	isConnected: boolean;
	isProfile?: boolean;
}) {
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
			<div className="container ">
				<div className="row-between px-3 md:px-0">
					<SmartLink href="/">
						<h1 className={classNames(isConnected && 'logo')}>
							Funny Movie
						</h1>
					</SmartLink>
					{profile?.id || isProfile ? (
						<div className="col md:row text-xs md:gap-4 md:text-base">
							<p>Welcome {[profile?.email]}</p>
							<div className="row nd:gap-4 gap-2">
								<Button
									type="primary"
									onClick={() => router.push(ROUTERS.SHARE)}
									data-testid="shareBtn"
								>
									Share a movie
								</Button>
								<Button
									onClick={onLogout}
									data-testid="logoutBtn"
								>
									Logout
								</Button>
							</div>
						</div>
					) : (
						<div className="row nd:gap-4 gap-2">
							<Button
								type="primary"
								onClick={() => onShowModal(false)}
								data-testid="loginBtn"
							>
								Login
							</Button>
							<Button
								onClick={() => onShowModal(true)}
								data-testid="registerBtn"
							>
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
