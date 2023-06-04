/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [`src/**/*.{js,ts,jsx,tsx}`],
	corePlugins: {
		// Remove Tailwind CSS's preflight style so it can use the antd's preflight instead (reset.css).
		preflight: false,
	},
	theme: {
		extend: {
			container: {
				// you can configure the container to be centered
				center: true,
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				black: {
					3: '#333333',
				},
				slate: {
					2: '#e2e8f0',
				},
			},
		},
	},
	plugins: [],
};
