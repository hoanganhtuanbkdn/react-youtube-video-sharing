/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['i.ytimg.com'],
	},
	output: 'standalone',
	transpilePackages: ['react-hook-mousetrap'],
};

module.exports = nextConfig;
