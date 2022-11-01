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
  selectAlert,
  setCorrectGuessedWords,
  setIncorrectGuessedWords,
  selectPossibleWords
} from '@slices/gameSlice'
import { useSelector } from 'react-redux';
import Button from '@ui/Button';
import englishWords from '@utils/englishWords';
import { useDispatch } from 'react-redux';

const Input = () => {
  const correctGuessedWords = useSelector(selectCorrectGuessedWords)
  const incorrectGuessedWords = useSelector(selectIncorrectGuessedWords)
  const possibleWords: string[] = useSelector(selectPossibleWords)
  const alert = useSelector(selectAlert)
  const score = useSelector(selectScore)
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null);
  const isActiveState = useSelector(selectIsActiveState);
  const randomLetters = useSelector(selectRandomLetters);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any) => {
    // This pattern tests if the entered word is composed of only the generated random letters, and only one of each of those letters.
    const randomLettersPattern = new RegExp(
      '^(?:([' + `${randomLetters.join('').toLowerCase()}` + '])(?!.*\\1))*$'
    );
    if (randomLettersPattern.test(e.currentTarget.value)) setInputValue(e.currentTarget.value);
    console.log(inputValue);
  };

  const handleLetterClick = (e: any) => {
    console.log(e.target.innerHTML)
    setInputValue((inputValue) => inputValue += e.target.innerHTML)
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
        <div className="flex flex-row text-center justify-center gap-4 items-center py-4">
          <input
            disabled={!isActiveState}
            ref={inputRef}
            value={inputValue}
            className="py-2 text-center rounded-lg shadow-sm focus:ring-[5px] transition-all sm:text-5xl uppercase outline-none"
            onChange={e => handleInputChange(e)}
          />
          <svg onClick={e => handleBackspace(e)} xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
          </svg>
          <Button disabled={!isActiveState} className='tracking-widest text-4xl text-white uppercase' type={"submit"}>Enter</Button>
        </div>


      </form>
      <>
        {isActiveState === true && randomLetters.length > 0 ? (
          <div className="letters--container">
            {randomLetters.map(letter => (
              <button
                key={letter}
                className={`

		transition-all hover:animate-[letterFadeIn_1s_ease-in-out] text-white flex flex-col place-content-center min-h-[100px] text-3xl 

${inputValue.includes(letter) ? 'border-[1px] border-green-700 hover:border-green-400' : 'border-[1px] border-[rgb(255,255,255,0.3)] hover:border-[rgb(255,255,255,0.9)]'} align-center items-center`}
                disabled={inputValue.split('').includes(letter)}
                value={letter}
                onClick={handleLetterClick}
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
