import { useToggle } from '@/hooks';
import { classNames } from '@/utils';
import { EventRegister } from '@/utils/EventEmitter';
import { PlayCircleOutlined } from '@ant-design/icons';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

export enum EVENT_EMITTER_NAME {
	PLAY_VIDEO = 'PLAY_VIDEO',
}
interface IVideoPlayerProps {
	cover: string;
	videoUrl: string;
	videoKey: number;
}

const VideoPlayer = ({ cover, videoUrl, videoKey }: IVideoPlayerProps) => {
	let listener = useRef<any>();

	console.log(cover, videoUrl, videoKey);

	const [playing, togglePlaying] = useToggle();

	const play = useCallback(() => {
		togglePlaying(true);
	}, []);

	const onPlay = useCallback(() => {
		console.log(11111, videoKey);

		EventRegister.emit(EVENT_EMITTER_NAME.PLAY_VIDEO, videoKey);
	}, [videoKey]);

	const onPause = useCallback(() => {
		togglePlaying(false);
	}, []);

	useEffect(() => {
		listener.current = EventRegister.addEventListener(
			EVENT_EMITTER_NAME.PLAY_VIDEO,
			(targetKey: number) => {
				console.log(2222, targetKey);

				if (targetKey !== videoKey) {
					// videoRef.current?.pause();
					togglePlaying(false);
				}
			}
		);

		return () => {
			EventRegister.removeEventListener(listener.current);
		};
	}, [videoKey]);

	return (
		<div
			className={classNames(
				'relative max-h-full w-full  overflow-hidden bg-cover bg-center bg-no-repeat'
			)}
			style={{
				backgroundImage: `url(${cover})`,
			}}
		>
			{!playing && (
				<div
					className={classNames(
						'center animation absolute inset-0 z-20 overflow-hidden bg-cover bg-center bg-no-repeat duration-200',
						playing ? 'opacity-0' : 'opacity-100'
					)}
					style={{
						backgroundImage: `url(${cover})`,
					}}
					onClick={play}
				>
					<button
						title="jGooooo - click me"
						className="cursor-pointer border-none bg-transparent p-4"
					>
						<PlayCircleOutlined
							style={{ color: 'white', fontSize: 40 }}
						/>
					</button>
				</div>
			)}

			<ReactPlayer
				onPlay={onPlay}
				onPause={onPause}
				url={videoUrl}
				controls={true}
				playing={playing}
				className={classNames('z-10')}
				width="100%"
				height="100%"
			/>
		</div>
	);
};

export default memo(VideoPlayer);
