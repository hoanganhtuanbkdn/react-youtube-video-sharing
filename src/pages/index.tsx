import VideoItem from '@/components/view/Home/VideoItem';
import { useLoadMoreOnScroll, useSessionStorage } from '@/hooks';
import { ISharing, ServiceApi } from '@/services';
import { ProfileSelectors } from '@/store';
import { insertObjectIf, isSuccess } from '@/utils';
import { DownOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Button, Dropdown, MenuProps, message, Space } from 'antd';

const items: MenuProps['items'] = [
	{
		label: 'Latest Video',
		key: '0',
	},
	{
		label: 'My Video',
		key: '1',
	},
];

const Home = () => {
	const [filterType, setFilterType] = useSessionStorage('FILTER', '0');
	const profile = useSelector(ProfileSelectors.selectProfile);
	const { data, loading, refetch } = useLoadMoreOnScroll<ISharing>(
		(filter) =>
			ServiceApi.getSharing({
				...filter,
				include: [{ relation: 'user' }],
				order: ['id DESC'],
				where: {
					...insertObjectIf(filterType === '1' && profile?.id, {
						userId: profile.id,
					}),
				},
			}),
		{
			wrapListId: 'list-sharing',
			key: 'getCommunityPosts',
			q: filterType + profile?.id,
		}
	);

	const handleMenuClick = useCallback((e: any) => {
		setFilterType(e.key);
		refetch();
	}, []);

	const menuProps = {
		items,
		onClick: handleMenuClick,
	};

	const onDeleteSharing = useCallback(async (sharingId: number) => {
		const res = await ServiceApi.deleteSharingById(sharingId);
		if (isSuccess(res)) {
			message.success('Delete item successful');
			refetch();
		}
	}, []);
	return (
		<main
			className={'col my-3 gap-4 px-3 xl:my-10 xl:px-40'}
			id="list-sharing"
			data-testid="list-sharing"
		>
			{profile?.id && (
				<div className="flex w-full items-end justify-end">
					<Dropdown menu={menuProps}>
						<Button>
							<Space>
								{filterType === '1'
									? 'My Video'
									: 'Latest Video'}
								<DownOutlined />
							</Space>
						</Button>
					</Dropdown>
				</div>
			)}

			{data?.map((item: ISharing) => (
				<VideoItem
					item={item}
					key={item.id}
					onDeleteSharing={
						filterType === '0' ? undefined : onDeleteSharing
					}
				/>
			))}
		</main>
	);
};

export default Home;
