import Container from '@game/Container';
import Input from '@game/Input';
import NewGame from '@game/NewGame';
import WelcomeModal from '@game/WelcomeModal';
import { Arima } from '@next/font/google';
import { wrapper } from '@store/index'
import React, { FC, useCallback, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { Provider, useSelector } from 'react-redux';
import { setIsActive, selectTimer, setTimer, selectIsOver, selectScore, selectCorrectGuessedWords, selectIsActiveState, setIsOver } from '@slices/gameSlice'
import { useDispatch } from 'react-redux';

const arima = Arima({ subsets: ['latin'] })

const Home: FC<AppProps> = ({ Component, ...rest }) => {
  const isOver = useSelector(selectIsOver)
  const correctGuessedWords = useSelector(selectCorrectGuessedWords)
  const isActive = useSelector(selectIsActiveState)
  const score = useSelector(selectScore)
  const timer = useSelector(selectTimer)
  const dispatch = useDispatch()
  const { store, } = wrapper.useWrappedStore(rest);

  const tickingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const tick = useCallback(() => {
    if (timer > 0 && isActive) {
      dispatch(setTimer(timer - 1))
    }
    if (timer < 1) {
      clearTimer();
    }
  }, [
    timer,
    isActive,
    dispatch
  ]);

  const setTickingInterval = useEffect(() => {
    tickingIntervalRef.current = setInterval(tick, 1000) as NodeJS.Timeout;
    return clearTimer;
  }, [timer, isActive, tick]);

  const clearTimer = () => {
    clearInterval(tickingIntervalRef.current as NodeJS.Timeout);
    tickingIntervalRef.current = null;
  };


  useEffect(() => {
    const submitData = async () => {
      try {
        const body = { score }
        await fetch('/api/game', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      } catch (error) {
        console.error(error)
      }
    }

    if (timer < 1) {
      dispatch(setIsOver(true))
      dispatch(setIsActive(false))
      submitData()
    }

  }, [timer, dispatch, score])



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
            <div className='cursor-pointer pb-4 text-white flex flex-col justify-center items-center'>
              <div className='flex flex-col justify-center items-center'>
                <span className={`text-4xl ${arima.className} tracking-wide py-4 serif uppercase`}>Time&apos;s up!</span>
                <span className="text-2xl py-4 tracking-wide uppercase font-serif">Final Score:</span>
                <span className='text-7xl'>{correctGuessedWords.length}</span>
                <NewGame />
              </div>
            </div>
          </>
        }



      </Container>
    </Provider >
  );
};

export default Home
