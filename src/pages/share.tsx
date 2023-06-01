import ShareForm from '@/components/view/ShareForm';
import { ServiceApi } from '@/services';
import { socket } from '@/services/socket';
import { ProfileSelectors } from '@/store';
import { isSuccess } from '@/utils';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { message } from 'antd';
import { useRouter } from 'next/router';

export default function SharePage() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const profile = useSelector(ProfileSelectors.selectProfile);

	const onFinish = async (values: { videoUrl: string }) => {
		setLoading(true);

		const metadata = await getMetadataLink(values.videoUrl);

		try {
			const res = await ServiceApi.createSharing({
				videoUrl: values.videoUrl,
				title: metadata?.title,
				description: metadata?.description,
				cover: metadata?.images?.[0],
			});
			if (isSuccess(res)) {
				socket.emit(
					'chat message',
					JSON.stringify({ ...res?.data, email: profile.email })
				);
				message.success('Share movie successful');
				router.replace('/');
			}
		} catch (e) {
		} finally {
			setLoading(false);
		}
	};

	const getMetadataLink = async (link: string) => {
		try {
			const response = await fetch(`/api/get-preview-link?link=${link}`);

			const result = await response.json();

			return result;
		} catch (e) {
			return {};
		}
	};

	return (
		<div className="center fixed inset-0 ">
			<ShareForm loading={loading} onFinish={onFinish} />
		</div>
	);
}
