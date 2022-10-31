import Navbar from '@ui/Navbar';
import Allowance from '@game/Allowance';
import GuessedWords from '@game/GuessedWords'
import Container from '@game/Container';
import Letters from '@game/Letters';
import Countdown from '@game/Countdown';
import Input from '@game/Input';
import Progress from '@game/Progress';
import NewGame from '@game/NewGame';
import WelcomeModal from '@game/WelcomeModal';
import { connect } from "react-redux";
import { wrapper } from '@store/index'
import React, { FC } from 'react';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { makeStore } from '@store/index'
import { Provider } from 'react-redux';

const Home: FC<AppProps> = ({ Component, ...rest }) => {

  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Navbar />
      <Container>
        <NewGame />
        <Allowance />
        {/* <Countdown /> */}
        <Progress />
        <WelcomeModal />
        <Input />
        <Letters />
        <GuessedWords />
      </Container>
    </Provider>
  );
};
/*
export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ params }) => {
      return {
        props: {
          isActive: false,
          wordsPerLetterLength: {}
        }
      };
    }
);
*/
export default Home
