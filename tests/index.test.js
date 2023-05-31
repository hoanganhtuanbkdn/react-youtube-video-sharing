import { render, screen } from '@testing-library/react';

import Home from '../src/pages/index';

import '@testing-library/jest-dom';

describe('Home', () => {
	test('renders Home Page', () => {
		const { container } = render(<Home />);
		expect(container.firstChild).toMatchSnapshot();
		// check if all components are rendered
		expect(screen.getByTestId('list-sharing')).toBeInTheDocument();
	});
});
