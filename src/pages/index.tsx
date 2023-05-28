import VideoPlayer from '@/components/ui/VideoPlayer';
import { useLoadMoreOnScroll } from '@/hooks';
import { ISharing, ServiceApi } from '@/services';

const Home = () => {
	const { data, loading } = useLoadMoreOnScroll<ISharing>(
		(filter) =>
			ServiceApi.getSharing({
				...filter,
				include: [{ relation: 'user' }],
				order: ['id DESC'],
			}),
		{
			wrapListId: 'list-sharing',
			key: 'getCommunityPosts',
		}
	);

	return (
		<main className={'col gap-4 xl:my-10 xl:px-40'} id="list-sharing">
			{data?.map((item: ISharing) => (
				<div
					key={item.id}
					className="flex h-[290px] flex-row overflow-hidden rounded-md border border-gray-300 shadow"
				>
					<div className="relative flex w-[440px]">
						<VideoPlayer
							videoUrl={item.videoUrl}
							cover={item.cover || ''}
							videoKey={item.id!}
						/>
					</div>
					<div className="col flex-1 items-start justify-start gap-3 px-5 py-3">
						<h1 className="!my-0">{item.title}</h1>
						<p className="!my-0">
							<strong>Share by:</strong> {item.user?.email}
						</p>
						<p className="!my-0 font-bold">Description</p>
						<p className="!my-0 line-clamp-3">{item.description}</p>
					</div>
				</div>
			))}
		</main>
	);
};

export default Home;
