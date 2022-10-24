import React, { FC } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/index';
import { Provider } from 'react-redux';

const MyApp: FC<AppProps> = ({ Component, pageProps, ...rest }) => {
	const { store, props } = wrapper.useWrappedStore(rest);
	return (
        <Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
};

export default MyApp;
