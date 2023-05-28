import { insertObjectIf } from '@/utils';
import React, { memo, ReactNode } from 'react';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { equals } from 'ramda';
import { isNotNilOrEmpty, isString } from 'ramda-adjunct';

interface ISmartLinkProps extends Omit<LinkProps, 'href'> {
	children: ReactNode;
	href: string | any[];
	className?: string;
	target?: string;
	targetBasePath?: string;
	skip?: boolean;
	style?: Object;
}

const SmartLink = ({
	children,
	href,
	onClick,
	className,
	target,
	skip,
	targetBasePath,
	style,
	...rest
}: ISmartLinkProps) => {
	// console.log('SmartLink', href, paramRequire, isString(href));
	const { asPath } = useRouter();

	if (
		(isNotNilOrEmpty(targetBasePath) && equals(targetBasePath, asPath)) ||
		skip
	) {
		if (className) {
			<div className={className}>{children}</div>;
		}
		return <>{children}</>;
	}

	const _href = isString(href)
		? href
		: {
				pathname: href?.[0],
				query: href?.[1],
		  };

	return (
		<Link
			href={_href}
			onClick={onClick}
			className={className}
			target={target}
			style={style}
			{...insertObjectIf(target === '_blank', {
				rel: 'noopener noreferrer',
			})}
			{...rest}
		>
			{children}
		</Link>
	);
};

export default memo(SmartLink);
