import React, { FC } from 'react';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import Head from 'next/head'
import { wrapper, makeStore } from '@store/index'
import { Provider } from 'react-redux';


const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Head>
        <title>LetterGo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="The word game that tests your vocabulary knowledge." />
      </Head>
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default MyApp
