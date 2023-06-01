import { render } from '@testing-library/react';
import React from 'react';

import VideoItem from './VideoItem';

// Must be imported before the tested file
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

const mockData: any = {
	id: 85,
	videoUrl: 'https://www.youtube.com/watch?v=pvBXT229quc',
	cover: 'https://i.ytimg.com/vi/pvBXT229quc/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFQgZSglMA8=&rs=AOn4CLBNRtBUDTmOqUHqHa5P8V8Ymy6okg',
	title: 'Làm Thế Nào Để Vượt Qua Giới Hạn Của Bản Thân (Rất Hay) - Thầy Minh Niệm',
	description:
		'Làm Thế Nào Để Vượt Qua Giới Hạn Của Bản Thân (Rất Hay) - Thầy Minh Niệm',
	createdAt: null,
	userId: 2,
	user: {
		id: 2,
		email: 'tuanpha.it@gmail.com',
		firstName: 'Tuan',
		lastName: 'Pham',
		roles: ['admin'],
		branchId: null,
		resetKey: null,
		resetCount: null,
		resetTimestamp: null,
		resetKeyTimestamp: null,
		createdAt: '2023-05-26T07:03:17.235Z',
		updatedAt: null,
	},
};

describe('rendering and submitting share form', () => {
	test('renders ShareForm correctly', () => {
		const handleClick: any = jest.fn((id: number) => {
			// console.log('values', values);
		});
		const { container } = render(
			<VideoItem onDeleteSharing={handleClick} item={mockData} />
		);

		expect(container.firstChild).toMatchSnapshot();
	});
});
