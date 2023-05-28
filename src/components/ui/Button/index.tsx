import React, { memo, ReactNode } from 'react';

import { classNames } from '../../../utils/Common.util';
import { Loading } from '../Loading';

import debounce from 'lodash.debounce';

const Button = (props: {
	children: ReactNode;
	onClick?: () => void;
	className?: string;
	loading?: boolean;
	disabled?: boolean;
	type?: 'submit' | 'cancel';
}) => {
	const {
		children,
		onClick = () => {
			// Empty
		},
		className,
		loading,
		disabled,
	} = props;
	const _onClick = debounce(() => {
		if (loading) return;
		onClick();
	}, 300);

	if (loading) {
		return (
			<button
				className={classNames(
					'center btn min-h-[54px] rounded-lg px-6 text-white md:px-10',
					props.type === 'submit'
						? 'bg-gradient-default'
						: 'bg-black3 bg-opacity-90',
					className
				)}
				type="button"
			>
				<Loading />
			</button>
		);
	}

	return (
		<button
			className={classNames(
				'center min-h-[54px] rounded-lg px-6 font-alumniSans text-white md:px-10 md:text-2xl',
				props.type === 'submit'
					? 'bg-gradient-default'
					: 'bg-black3 bg-opacity-90',
				className
			)}
			onClick={_onClick}
			disabled={disabled}
			type="button"
		>
			{children}
		</button>
	);
};

export default memo(Button);
