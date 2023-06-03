import { ROUTERS } from '@/constants';
import { IUser } from '@/services';
import React, { memo } from 'react';

import { Popover } from 'antd';
import Link from 'next/link';

const content = (
	<div className="min-w-[200px] py-3">
		<Link href={ROUTERS.ROOM_MANAGER}>
			<div className="cursor-pointer hover:text-blue-500">
				Quản lý phòng nhạc
			</div>
		</Link>
	</div>
);

const ProfileButton = memo(({ profile }: { profile: IUser }) => (
	<div>
		<Popover placement="bottomRight" content={content} trigger="click">
			<p className="cursor-pointer">Welcome {[profile?.email]}</p>
		</Popover>
	</div>
));

export { ProfileButton };
