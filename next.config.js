/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['i.ytimg.com'],
	},
	output: 'standalone',
};

module.exports = nextConfig;
