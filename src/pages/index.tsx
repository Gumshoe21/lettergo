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
import { selectIsOver, selectScore, selectCorrectGuessedWords, selectIncorrectGuessedWords, selectPossibleWords, selectIsActiveState } from '@slices/gameSlice'

const Home: FC<AppProps> = ({ Component, ...rest }) => {
  const isOver = useSelector(selectIsOver)
  const correctGuessedWords = useSelector(selectCorrectGuessedWords)
  const incorrectGuessedWords = useSelector(selectIncorrectGuessedWords)
  const possibleWords = useSelector(selectPossibleWords)
  const isActive = useSelector(selectIsActiveState)
  const score = useSelector(selectScore)
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Navbar />
      <Container>
        <WelcomeModal />


        {!isOver && <NewGame />}
        {!isOver && isActive &&
          <>
            <WordsToFind />
          </>
        }
        {!isOver && <Input />}

        {!isOver && isActive &&
          <GuessedWords />
        }
        {isOver &&
          <><div className='px-20 py-8 text-white gap-8 flex flex-col justify-center items-center'>
            <span className="text-3xl uppercase font-serif">Score Breakdown:</span>
            <div className='flex flex-col gap-2 text-2xl'>
              <span>{correctGuessedWords.length} {correctGuessedWords.length > 1 ? 'words' : 'word'} out of {possibleWords.length} ({(100 * correctGuessedWords.length / possibleWords.length).toFixed(2)}%).</span>
              <span>{incorrectGuessedWords.length} incorrect words.</span>
              <span>{score} allowance left.</span>
            </div>
          </div>
            <NewGame /></>}

      </Container>
    </Provider >
  );
};

export default Home
