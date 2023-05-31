import { store } from '@/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import GlobalLayout from '../GlobalLayout';
import Header from '.';

import '@testing-library/jest-dom/extend-expect';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

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
describe('next-router-mock', () => {
	test('renders Header correctly', () => {
		const { container } = render(
			<Provider store={store}>
				<Header isConnected isProfile />
			</Provider>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	test('check login button', () => {
		render(
			<Provider store={store}>
				<Header isConnected />
			</Provider>
		);

		const button = screen.getByTestId('loginBtn');
		fireEvent.click(button);

		expect(screen.getByText('Funny Login')).toBeInTheDocument();
	});
	test('check register button', () => {
		render(
			<Provider store={store}>
				<Header isConnected />
			</Provider>
		);

		const button = screen.getByTestId('registerBtn');
		fireEvent.click(button);

		expect(screen.getByText('Funny Register')).toBeInTheDocument();
	});
	test('check share button', () => {
		// Set the initial url:
		mockRouter.push('/share');

		// Render the component:
		render(
			<Provider store={store}>
				<Header isConnected isProfile />
			</Provider>
		);

		const button = screen.getByTestId('shareBtn');

		// Click the button:
		fireEvent.click(button);

		// Ensure the router was updated:
		expect(mockRouter).toMatchObject({
			asPath: '/share',
			pathname: '/share',
		});
	});

	test('check logout button', () => {
		render(
			<Provider store={store}>
				<GlobalLayout>
					<Header isConnected isProfile />
				</GlobalLayout>
			</Provider>
		);

		const button = screen.getByTestId('logoutBtn');
		fireEvent.click(button);

		expect(screen.getByText('Login')).toBeInTheDocument();
	});
});
