import { render, screen } from '@testing-library/react';

import Home from '../src/pages/index';

import '@testing-library/jest-dom';

describe('Calculator', () => {
	it('renders a calculator', () => {
		render(<Home />);
		// check if all components are rendered
		expect(screen.getByTestId('list-sharing')).toBeInTheDocument();
	});
});
