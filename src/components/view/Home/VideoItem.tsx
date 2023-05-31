import VideoPlayer from '@/components/ui/VideoPlayer';
import { ISharing } from '@/services';
import { DeleteOutlined } from '@ant-design/icons';
import React, { memo } from 'react';

import { Popconfirm } from 'antd';

export const VideoItem = ({
	item,
	onDeleteSharing,
}: {
	item: ISharing;
	onDeleteSharing: ((id: number) => Promise<void>) | undefined;
}) => {
	return (
		<div className="flex flex-col overflow-hidden rounded-md border border-gray-300 shadow md:h-[290px] md:flex-row">
			<div className="relative flex h-[200px] w-full md:h-full md:w-[440px]">
				<VideoPlayer
					videoUrl={item.videoUrl}
					cover={item.cover || ''}
					videoKey={item.id!}
				/>
			</div>
			<div className="col flex-1 items-start justify-start gap-1 px-5 py-3 text-xs md:gap-3 md:text-base">
				<h1 className="!my-0 text-xl md:text-2xl">{item.title}</h1>
				<p className="!my-0">
					<strong>Share by:</strong> {item.user?.email}
				</p>
				<p className="!my-0 font-bold">Description</p>
				<p className="!my-0 line-clamp-3">{item.description}</p>
				{!!onDeleteSharing && (
					<div className="flex w-full items-end justify-end">
						<Popconfirm
							title="Delete the item"
							description="Are you sure to delete this item?"
							okText="Yes"
							cancelText="No"
							onConfirm={() => onDeleteSharing?.(item.id!)}
						>
							<DeleteOutlined style={{ color: 'red' }} />
						</Popconfirm>
					</div>
				)}
			</div>
		</div>
	);
};

export default memo(VideoItem);
