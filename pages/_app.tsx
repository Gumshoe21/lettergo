import React, { FC } from 'react';
import '../src/styles/globals.css'
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import Head from 'next/head'
import Navbar from '@ui/Navbar'
import { wrapper, } from '@store/index'
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';


const MyApp: FC<AppProps> = ({ Component, pageProps, ...rest }: AppProps) => {
  const { store, } = wrapper.useWrappedStore(rest);
  return (

    <SessionProvider session={pageProps.session}>

      <Provider store={store}>

        <Head>
          <title>LetterGo</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="The word game that tests your vocabulary knowledge." />
        </Head>

        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
};

export default MyApp
