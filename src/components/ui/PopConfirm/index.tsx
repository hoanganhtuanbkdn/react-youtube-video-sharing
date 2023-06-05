import { NOOP } from '@/constants';
import React, { memo, ReactNode } from 'react';

import { Button, Popconfirm } from 'antd';

const PopConfirm = ({
	children = <Button>click</Button>,
	onOk = NOOP,
	description = 'Delete the task',
	text = 'Are you sure to delete this task?',
}: {
	children: ReactNode;
	onOk: () => void;
	description?: string;
	text?: string;
}) => (
	<div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
		<Popconfirm
			placement="topRight"
			title={text}
			description={description}
			onConfirm={onOk}
			okText="Yes"
			cancelText="No"
		>
			{children}
		</Popconfirm>
	</div>
);

export default memo(PopConfirm);
