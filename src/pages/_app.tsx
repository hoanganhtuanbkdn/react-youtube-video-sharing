import ErrorBoundary from '@/components/ui/ErrorBoundary';
import GlobalLayout from '@/components/ui/GlobalLayout';
import { persistor, store } from '@/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import { NextPage } from 'next';
// include styles from the ui package
// import 'ui/styles.css'
import type { AppProps } from 'next/app';
import { Alumni_Sans, Quicksand } from 'next/font/google';
import { PersistGate } from 'redux-persist/integration/react';

const quicksand = Quicksand({
	subsets: ['vietnamese', 'latin'],
	weight: ['500', '700'],
	style: ['normal'],
	fallback: ['system-ui'],
});
const alumni = Alumni_Sans({
	subsets: ['vietnamese', 'latin'],
	weight: ['500', '700'],
	style: ['normal'],
	fallback: ['system-ui'],
});

export type NextPageWithLayout<T = any> = NextPage<T> & {
	getLayout?: any;
	title?: string;
	description?: string;
	image?: string;
};

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	return (
		<>
			<ErrorBoundary>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<ToastContainer />
						<GlobalLayout>
							<Component {...pageProps} />
						</GlobalLayout>
					</PersistGate>
				</Provider>
			</ErrorBoundary>

			<style jsx global>{`
				:root {
					--quicksand-font: ${quicksand.style.fontFamily};
					--alumniSans-font: ${alumni.style.fontFamily};
				}
			`}</style>
		</>
	);
}
