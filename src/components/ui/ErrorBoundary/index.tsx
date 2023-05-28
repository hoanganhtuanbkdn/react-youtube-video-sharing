/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import React from 'react';

import Button from '../Button';

class ErrorBoundary extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		// Define a state variable to track whether is an error or not
		this.state = { hasError: false };
	}
	static getDerivedStateFromError(error: any) {
		// Update state so the next render will show the fallback UI
		return { hasError: true };
	}
	componentDidCatch(error: any, errorInfo: any) {
		// You can use your own error logging service here
	}

	onReload = () => {
		if (location) {
			location.reload();
		}
	};
	render() {
		// Check if the error is thrown
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="center col container mx-auto min-h-[600px] text-center">
					<h1 className="mb-9 mt-5 w-[920px] text-2xl text-white">
						{
							'Hệ thống đang bảo trì, vui lòng quay lại sau ít phút.'
						}
					</h1>
					<Button className="btn-main" onClick={this.onReload}>
						Thử lại
					</Button>
				</div>
			);
		}

		// Return children components in case of no error

		return this.props.children;
	}
}

export default ErrorBoundary;
