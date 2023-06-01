import { store } from '@/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import Home from '../src/pages/index';

import '@testing-library/jest-dom';

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

describe('Home', () => {
	test('renders Home Page', () => {
		const { container } = render(
			<Provider store={store}>
				<Home />
			</Provider>
		);
		expect(container.firstChild).toMatchSnapshot();
		// check if all components are rendered
		expect(screen.getByTestId('list-sharing')).toBeInTheDocument();
	});
});
