import { insertObjectIf } from '@/utils';
import React, { memo, useEffect, useState } from 'react';

import Image, { ImageProps } from 'next/legacy/image';

interface ILegacyImageProps extends Omit<ImageProps, 'alt' | 'src'> {
	fill?: boolean;
	src: string | any | undefined;
	alt?: string;
}

const LegacyImage = ({ src, fill, alt = '', ...rest }: ILegacyImageProps) => {
	const [source, setSource] = useState(src);

	const onError = () => {
		setSource('/banner.jpg');
	};
	useEffect(() => {
		setSource(src);
	}, [src]);
	return (
		<>
			<Image
				src={source}
				onError={onError}
				alt={
					alt
						? alt + ' - BOJOHOME'
						: 'BOJOHOME - Thiết Kế Kiến Trúc và Thi Công Xây Dựng Quảng Nam, Đà Nẵng'
				}
				{...insertObjectIf(fill, {
					layout: 'fill',
					objectFit: 'cover',
					objectPosition: 'center',
				})}
				{...insertObjectIf(rest.blurDataURL, {
					placeholder: 'blur',
				})}
				{...rest}
			/>
		</>
	);
};

export default memo(LegacyImage);
