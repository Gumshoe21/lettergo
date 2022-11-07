import Container from '@game/Container';
import Input from '@game/Input';
import NewGame from '@game/NewGame';
import WelcomeModal from '@game/WelcomeModal';
import { wrapper } from '@store/index'
import React, { FC, useState, useCallback, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { Provider, useSelector } from 'react-redux';
import { setIsActive, selectTimer, setTimer, selectIsOver, selectScore, selectCorrectGuessedWords, selectIncorrectGuessedWords, selectPossibleWords, selectIsActiveState, setIsOver } from '@slices/gameSlice'
import { useDispatch } from 'react-redux';
const Home: FC<AppProps> = ({ Component, ...rest }) => {
  const isOver = useSelector(selectIsOver)
  const correctGuessedWords = useSelector(selectCorrectGuessedWords)
  const incorrectGuessedWords = useSelector(selectIncorrectGuessedWords)
  const possibleWords = useSelector(selectPossibleWords)
  const isActive = useSelector(selectIsActiveState)
  const score = useSelector(selectScore)
  const timer = useSelector(selectTimer)
  const dispatch = useDispatch()
  const { store, props } = wrapper.useWrappedStore(rest);

  const tickingIntervalRef = useRef(null);

  const tick = useCallback(() => {
    if (timer > 0 && isActive) {
      dispatch(setTimer(timer - 1))
    }
    if (timer < 1) {
      clearTimer();
    }
  }, [
    timer,
    isActive
  ]);

  useEffect(() => {
    if (timer < 1) {
      dispatch(setIsOver(true))
      dispatch(setIsActive(false))
    }
  }, [timer, setTimer])

  const setTickingInterval = useEffect(() => {
    tickingIntervalRef.current = setInterval(tick, 1000);
    return clearTimer;
  }, [timer, isActive]);


  const clearTimer = () => {
    clearInterval(tickingIntervalRef.current);
    tickingIntervalRef.current = null;
  };

  return (
    <Provider store={store}>
      <Container>
        <WelcomeModal />
        <div className='pt-4 gap-2 flex items-center justify-between font-mono text-3xl text-white mx-4'>
          <span className="bg-[rgb(255,255,255,0.03)] py-2 px-4 rounded-xl">{timer}</span>
          <span className="bg-[rgb(255,255,255,0.03)] py-2 px-4 rounded-xl">{score}</span>
        </div>

        {!isOver && <NewGame />}

        {!isOver && <Input />}

        {
          isOver &&
          <>
            <div className='cursor-pointer px-20 py-8 text-white gap-8 flex flex-col justify-center items-center'>
              {score === 0 && <span className='text-xl'>You're all out of allowance!</span>}
              <span className="text-3xl uppercase font-serif">Score Breakdown:</span>
              <div className='flex flex-col gap-2 text-2xl'>
                <span>{correctGuessedWords.length} {correctGuessedWords.length !== 1 ? 'words' : 'word'} out of {possibleWords.length} ({(100 * correctGuessedWords.length / possibleWords.length).toFixed(2)}%).</span>
                <span>{incorrectGuessedWords.length} incorrect words.</span>
                <span>{score} allowance left.</span>
              </div>
            </div>
            <NewGame />
          </>
        }



      </Container>
    </Provider >
  );
};

export default Home
