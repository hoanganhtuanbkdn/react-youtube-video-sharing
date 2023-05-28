import { classNames } from '@/utils';
import React, { memo } from 'react';

import Image, { ImageProps } from 'next/image';

interface INextImage extends Omit<ImageProps, 'alt' | 'src'> {
	alt?: string;
	src: string | undefined | any;
}
const NextImage: React.FC<INextImage> = ({
	src,
	alt = '',
	className,
	...props
}) => {
	return (
		<Image
			src={src}
			alt={
				alt
					? alt + ' - BOJOHOME'
					: 'BOJOHOME - Thiết Kế Kiến Trúc và Thi Công Xây Dựng Quảng Nam, Đà Nẵng'
			}
			className={classNames(!props?.width && 'h-auto w-full', className)}
			quality={100}
			{...(props as any)}
			sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
		/>
	);
};

export default memo(NextImage);
