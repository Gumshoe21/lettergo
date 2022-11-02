import Navbar from '@ui/Navbar';
import GuessedWords from '@game/GuessedWords'
import Container from '@game/Container';
import Alert from '@game/Alert'
import Input from '@game/Input';
import Progress from '@game/Progress';
import NewGame from '@game/NewGame';
import WelcomeModal from '@game/WelcomeModal';
import { wrapper } from '@store/index'
import React, { FC } from 'react';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

const Home: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Navbar />
      <Container>
        <NewGame />
        <Progress />
        <WelcomeModal />
        {/*<Alert/>*/}
        <Input />
        <GuessedWords />
      </Container>
    </Provider>
  );
};

export default Home
