import { render } from '@testing-library/react';
import React from 'react';

import ShareForm from '.';

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
describe('rendering and submitting share form', () => {
	test('renders ShareForm correctly', () => {
		const handleClick = jest.fn((values: any) => {
			console.log('values', values);
		});
		const { container } = render(
			<ShareForm onFinish={handleClick} loading={false} />
		);

		expect(container.firstChild).toMatchSnapshot();

		// const Input = container.querySelector('#videoUrl');

		// expect(Input).toBeInTheDocument();

		// // fireEvent.change(Input!, {
		// // 	target: { value: 'https://www.youtube.com/watch?v=qgb-bdEEI-M' },
		// // });
		// // console.log(Input);

		// const Button = container.querySelector('.submitShareBtn');

		// expect(Button).toBeInTheDocument();

		// // fireEvent.click(Button!);

		// // expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
