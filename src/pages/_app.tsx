import React, { FC } from 'react';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { wrapper, makeStore } from '@store/index'
import { Provider } from 'react-redux';


const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Component {...props.pageProps} />
  );
};

export default MyApp
