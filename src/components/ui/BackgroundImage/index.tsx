import { classNames } from '@/utils';
import { memo } from 'react';

import Image, { ImageProps } from 'next/image';

export interface StaticImageData {
	src: string;
	height: number;
	width: number;
	blurDataURL?: string;
	blurWidth?: number;
	blurHeight?: number;
}
interface StaticRequire {
	default: StaticImageData;
}
declare type StaticImport = StaticRequire | StaticImageData;

interface IBackgroundImageProps extends Omit<ImageProps, 'alt' | 'src'> {
	alt?: string;
	src: string | StaticImport;
}

const BackgroundImage = ({
	src,
	className,
	alt,
	...rest
}: IBackgroundImageProps) => {
	return (
		<Image
			fill
			src={src}
			alt={
				alt
					? alt + ' - BOJOHOME'
					: 'BOJOHOME - Thiết Kế Kiến Trúc và Thi Công Xây Dựng Quảng Nam, Đà Nẵng'
			}
			className={classNames('object-cover object-center', className)}
			quality={100}
			sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
			{...(rest as any)}
		/>
	);
};

export default memo(BackgroundImage);
