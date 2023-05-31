import React, { useState } from 'react';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// Perform login logic here
		// For simplicity, let's just log the email and password to the console
		console.log('Email:', email);
		console.log('Password:', password);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default LoginForm;
