import { useRef, useState, useEffect } from 'react';
import {
  selectIsActiveState,
  setIsActive,
  selectRandomLetters,
  setScore,
  selectScore,
  selectIncorrectGuessedWords,
  selectCorrectGuessedWords,
  setAlert,
  setCorrectGuessedWords,
  setIncorrectGuessedWords,
  selectPossibleWords,
  selectWordsPerLetterLength,
  setWordCountPerLetterLength,
} from '@slices/gameSlice'
import { useSelector } from 'react-redux';
import Button from '@ui/Button';
import englishWords from '@utils/englishWords';
import { useDispatch } from 'react-redux';

const Input = () => {
  const correctGuessedWords = useSelector(selectCorrectGuessedWords)
  const incorrectGuessedWords = useSelector(selectIncorrectGuessedWords)
  const possibleWords: string[] = useSelector(selectPossibleWords)
  const score = useSelector(selectScore)
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null);
  const isActiveState = useSelector(selectIsActiveState);
  const randomLetters = useSelector(selectRandomLetters);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any) => {
    // This pattern tests if the entered word is composed of only the generated random letters, and only one of each of those letters.
    const randomLettersPattern = new RegExp(
      '^(?:([' + `${randomLetters.join('').toUpperCase()}` + '])(?!.*\\1))*$'
    );
    if (randomLettersPattern.test(e.currentTarget.value.toUpperCase())) setInputValue(e.currentTarget.value.toUpperCase());
    console.log(inputValue);
  };

  const handleLetterClick = (e: any) => {
    if (!inputValue.includes(e.target.innerHTML.toUpperCase())) {
      setInputValue((inputValue) => inputValue += e.target.innerHTML.toUpperCase())
    }
    else {
      setInputValue((inputValue) => inputValue.split('').filter(i => i !== e.target.innerHTML.toUpperCase()).join(''))
    }
    console.log(inputValue)
  }
  useEffect(() => {
    // Win scenario.
    if (correctGuessedWords.length > 0 && correctGuessedWords.length === possibleWords.length) {
      dispatch(setAlert("You got 'em all! That's amazing! You're a true wordsmith."))
      dispatch(setIsActive(false));
      return;
    }
  }, [correctGuessedWords])

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    // Duplicate guess scenario.
    if (correctGuessedWords.includes(inputRef.current?.value.toLowerCase() as string) || incorrectGuessedWords.includes(inputRef.current?.value.toLowerCase() as string)) {
      dispatch(setAlert("You've already guessed this word!"))
      return;
    }
    // Valid word scenario.
    if (englishWords.includes(inputRef.current?.value.toLowerCase() as string)) {
      let wordLength: number | undefined = inputRef.current?.value.length
      dispatch(setWordCountPerLetterLength(wordLength))
      if (inputRef.current) dispatch(setCorrectGuessedWords(inputRef.current?.value.toLowerCase()))

      dispatch(setScore(score + 10))

      dispatch(setAlert("Nice one!"))

      setInputValue('')
      return;
    }
    else {
      // Game over scenario.
      if (score === 5) {
        dispatch(setScore(score - 5))
        dispatch(setAlert("Game Over! Try again."))
        dispatch(setIsActive(false))
        return
      }
      // Nonexistent word scenario.
      dispatch(setScore(score - 5))
      dispatch(setIncorrectGuessedWords(inputRef.current?.value.toLowerCase()))
      dispatch(setAlert("Whoops! That word doesn't exist."))

      return;
    }
  }

  const handleBackspace = (e) => {
    if (inputValue.length > 0) {
      setInputValue(inputValue.substr(0, inputValue.length - 1))
    }
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-row text-center justify-around gap-2 items-center py-4 px-4">
          <svg onClick={e => handleBackspace(e)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-16 h-16">
            <path fillRule="evenodd" d="M7.22 3.22A.75.75 0 017.75 3h9A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17h-9a.75.75 0 01-.53-.22L.97 10.53a.75.75 0 010-1.06l6.25-6.25zm3.06 4a.75.75 0 10-1.06 1.06L10.94 10l-1.72 1.72a.75.75 0 101.06 1.06L12 11.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L12 8.94l-1.72-1.72z" clipRule="evenodd" />
          </svg>
          <input
            aria-label="Word Input"
            disabled={!isActiveState}
            ref={inputRef}
            value={inputValue}
            className="py-2 text-center rounded-lg shadow-sm focus:ring-[5px] text-3xl md:text-4xl uppercase outline-none"
            onChange={e => handleInputChange(e)}
          />

          <Button disabled={!isActiveState} className='tracking-widest text-4xl text-white uppercase' type={"submit"}>Enter</Button>
        </div>


      </form>
      <>
        {isActiveState === true && randomLetters.length > 0 ? (
          <div className="letters--container">
            {randomLetters.map(letter => (
              <button
                key={letter}
                className={`transition-all duration-500 hover:animate-[letterFadeIn_1s_ease-in-out] text-white flex flex-col place-content-center min-h-[100px] text-3xl ${inputValue.includes(letter) ? 'border-[2px] border-green-600 hover:border-green-500' : 'border-[1px] border-[rgb(255,255,255,0.3)] hover:border-[rgb(255,255,255,0.9)]'} align-center items-center`}
                value={letter}
                onClick={(e) => handleLetterClick(e)}
              >
                {isActiveState && letter}
              </button>
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
