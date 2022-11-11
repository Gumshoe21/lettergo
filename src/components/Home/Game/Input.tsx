import React, { useRef, useState, useEffect } from 'react';
import {
  selectIsActiveState,
  setIsActive,
  selectRandomLetters,
  setScore,
  selectScore,
  selectCorrectGuessedWords,
  setAlert,
  setCorrectGuessedWords,
  selectPossibleWords,
  setWordCountPerLetterLength,
  selectIsOver,
  setRandomLetters,
  setTimer,
  selectTimer
} from '@slices/gameSlice'
import { useSelector } from 'react-redux';
import Button from '@ui/Button';
import englishWords from '@utils/englishWords';
import { useDispatch } from 'react-redux';
import _ from 'lodash'

const Input = () => {
  const correctGuessedWords: string[] = useSelector(selectCorrectGuessedWords)
  const possibleWords: string[] = useSelector(selectPossibleWords)
  const score: number = useSelector(selectScore)
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null);
  const isActiveState: boolean = useSelector(selectIsActiveState);
  const randomLetters: string[] = useSelector(selectRandomLetters);
  const timer: number = useSelector(selectTimer);
  const isOver: boolean = useSelector(selectIsOver);

  const [inputValue, setInputValue] = useState<string>('');
  const [vowels, setVowels] = useState<string[]>(['A', 'E', 'I', 'O', 'U'])
  const [consonants, setConsonants] = useState<string[]>(['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'])


  const handleInputChange = (e: any) => {
    const randomLettersPattern = new RegExp(
      '^(?:([' + `${randomLetters.join('').toUpperCase()}` + '])(?!.*\\1))*$'
    );
    if (randomLettersPattern.test(e.currentTarget.value.toUpperCase())) setInputValue(e.currentTarget.value.toUpperCase());
  };

  const handleLetterClick = (e: any) => {
    if (!inputValue.includes(e.target.innerHTML.toUpperCase())) {
      setInputValue((inputValue) => inputValue += e.target.innerHTML.toUpperCase())
    }
    else {
      setInputValue((inputValue) => inputValue.split('').filter(i => i !== e.target.innerHTML.toUpperCase()).join(''))
    }
  }

  useEffect(() => {
    if (correctGuessedWords.length > 0 && correctGuessedWords.length === possibleWords.length) {
      dispatch(setAlert("You got 'em all! That's amazing! You're a true wordsmith."))
      dispatch(setIsActive(false));
      return;
    }
  }, [correctGuessedWords, dispatch, possibleWords.length])

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (englishWords.includes(inputRef.current?.value.toLowerCase() as string)) {
      let wordLength: number | undefined = inputRef.current?.value.length
      dispatch(setWordCountPerLetterLength(wordLength))
      if (inputRef.current) {
        dispatch(setCorrectGuessedWords(inputRef.current?.value.toLowerCase()))
      }
      dispatch(setScore(score + 1))
      dispatch(setAlert("Nice one!"))

      let correctWordLetters: string[] = inputRef.current!.value.toUpperCase().split('')

      let replacementLetters = consonants.filter(() => {
        for (let i = 0; i < consonants.length; i++) {
          if (randomLetters.includes(consonants[i])) {
            setConsonants(consonants.splice(consonants.indexOf(consonants[i]), 1))
          }
        }
      })

      let randomLettersCopy = randomLetters;

      for (let i = 0; i < correctWordLetters!.length; i++) {
        if (!randomLettersCopy.includes('A' || 'E' || 'I' || 'O' || 'U')) {
          randomLettersCopy = randomLettersCopy.join('').replace(`${correctWordLetters![i]}`, _.shuffle(vowels).filter(letter => !randomLettersCopy.includes(letter)).pop() as string).split('')
        } else {
          randomLettersCopy = randomLettersCopy.join('').replace(`${correctWordLetters![i]}`, _.shuffle(consonants).filter(letter => !randomLettersCopy.includes(letter)).pop() as string).split('')
        }
      }

      dispatch(setRandomLetters(randomLettersCopy))
      setConsonants(consonants => ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']);
      setInputValue('')
      dispatch(setTimer(timer + 5))

    }
  }

  const handleBackspace = (_e: React.MouseEvent<SVGSVGElement>) => {
    if (inputValue.length > 0) {
      setInputValue(inputValue.substring(0, inputValue.length - 1))
    }
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-row text-center justify-around gap-2 items-center py-4 px-4">
          <svg onClick={(e: React.MouseEvent<SVGSVGElement>) => handleBackspace(e)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-12 h-12 cursor-pointer">
            <path fillRule="evenodd" d="M7.22 3.22A.75.75 0 017.75 3h9A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17h-9a.75.75 0 01-.53-.22L.97 10.53a.75.75 0 010-1.06l6.25-6.25zm3.06 4a.75.75 0 10-1.06 1.06L10.94 10l-1.72 1.72a.75.75 0 101.06 1.06L12 11.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L12 8.94l-1.72-1.72z" clipRule="evenodd" />
          </svg>
          <input
            aria-label="Word Input"
            disabled={!isActiveState}
            ref={inputRef}
            value={inputValue}
            className="font-serif tracking-tighest py-1 text-center rounded-lg shadow-sm focus:ring-[5px] text-1xl md:text-2xl uppercase outline-none"
            onChange={e => handleInputChange(e)}
          />

          <Button disabled={!isActiveState} type={"submit"}>Enter</Button>
        </div>

      </form>

      <>
        {isActiveState || isOver === true && randomLetters.length > 0 ? (
          <div className="letters--container">
            {randomLetters.map(letter => (
              <div className='flex flex-col w-full' key={letter}>
                <button
                  key={letter}
                  className={`transition-all duration-500 hover:animate-[letterFadeIn_1s_ease-in-out] text-white   place-content-center min-h-[100px] font-serif text-5xl ${inputValue.includes(letter) ? 'border-[2px] border-green-600 hover:border-green-500' : 'border-[2px] border-[rgb(255,255,255,0.3)] hover:border-[rgb(255,255,255,0.9)]'} align-center items-center`}
                  value={letter}
                  onClick={(e) => handleLetterClick(e)}
                >
                  {letter}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="letters--container">
            <span className="letters--letter"></span>
            <span className="letters--letter"></span>
            <span className="letters--letter"></span>
            <span className="letters--letter"></span>
            <span className="letters--letter"></span>
            <span className="letters--letter"></span>
            <span className="letters--letter"></span>
            <span className="letters--letter"></span>
            <span className="letters--letter"></span>
            <span className="letters--letter"></span>
            <span className="letters--letter"></span>
            <span className="letters--letter"></span>
          </div>
        )}
      </>
    </>
  );
};

export default Input;
