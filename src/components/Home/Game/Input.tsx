import { useRef, useState } from 'react';
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
      // Win scenario.
      if (correctGuessedWords.length === possibleWords.length) {
        dispatch(setAlert("You got 'em all! That's amazing! You're a true wordsmith."))
        dispatch(setIsActive(false));
        return;
      }
      dispatch(setAlert("Nice one!"))
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

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="input--container">
        <div className='text-white'>{alert}</div>
        <input
          disabled={!isActiveState}
          ref={inputRef}
          value={inputValue}
          className="py-2 text-center rounded-lg shadow-sm focus:ring-[5px] transition-all sm:text-5xl uppercase outline-none"
          onChange={e => handleInputChange(e)}
        />
        <Button disabled={!isActiveState} type={"submit"}>Submit</Button>
      </div>
    </form>
  );
};

export default Input;
