import Navbar from '@ui/Navbar';
import GuessedWords from '@game/GuessedWords'
import Container from '@game/Container';
import Input from '@game/Input';
import WordsToFind from '@game/WordsToFind';
import NewGame from '@game/NewGame';
import WelcomeModal from '@game/WelcomeModal';
import { wrapper } from '@store/index'
import React, { FC } from 'react';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { Provider, useSelector } from 'react-redux';
import { selectIsOver, selectCorrectGuessedWords, selectPossibleWords, } from '@slices/gameSlice'

const Home: FC<AppProps> = ({ Component, ...rest }) => {
  const isOver = useSelector(selectIsOver)
  const correctGuessedWords = useSelector(selectCorrectGuessedWords)
  const possibleWords = useSelector(selectPossibleWords)
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Navbar />
      <Container>
        <NewGame />
        {!isOver && <WordsToFind />}
        <WelcomeModal />
        {/*<Alert/>*/}
        {!isOver && <Input />}
        {isOver && <div className='p-20 text-white flex flex-col justify-center items-center text-3xl'>
          <span>You found:</span>
          <span>{correctGuessedWords.length} {correctGuessedWords.length > 1 ? 'words' : 'word'} out of {possibleWords.length}, or {(100 * correctGuessedWords.length / possibleWords.length).toFixed(2)} % of all possible words</span>
        </div>}
        {!isOver && <GuessedWords />}
      </Container>
    </Provider>
  );
};

export default Home
