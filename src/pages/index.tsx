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
		<main
			className={'col my-3 gap-4 px-3 xl:my-10 xl:px-40'}
			id="list-sharing"
		>
			{data?.map((item: ISharing) => (
				<div
					key={item.id}
					className="flex flex-col overflow-hidden rounded-md border border-gray-300 shadow md:h-[290px] md:flex-row"
				>
					<div className="relative flex h-[200px] w-full md:h-full md:w-[440px]">
						<VideoPlayer
							videoUrl={item.videoUrl}
							cover={item.cover || ''}
							videoKey={item.id!}
						/>
					</div>
					<div className="col flex-1 items-start justify-start gap-1 px-5 py-3 text-xs md:gap-3 md:text-base">
						<h1 className="!my-0 text-xl md:text-2xl">
							{item.title}
						</h1>
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
