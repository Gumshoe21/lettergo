import { useRef, useState } from 'react';
import {
  selectIsActiveState,
  selectRandomLetters,
  setScore,
  selectScore,
  selectIncorrectGuessedWords,
  selectCorrectGuessedWords,
  setAlert,
  selectAlert,
  setCorrectGuessedWords,
  setIncorrectGuessedWords
} from '@slices/gameSlice'
import { useSelector } from 'react-redux';
import Button from '@ui/Button';
import englishWords from '@utils/englishWords';
import { useDispatch } from 'react-redux';

const Input = () => {
  const correctGuessedWords = useSelector(selectCorrectGuessedWords)
  const incorrectGuessedWords = useSelector(selectIncorrectGuessedWords)
  const alert = useSelector(selectAlert)
  const score = useSelector(selectScore)
  const dispatch = useDispatch()
  const inputRef = useRef(null);
  const isActiveState = useSelector(selectIsActiveState);
  const randomLetters = useSelector(selectRandomLetters);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any) => {
    const randomLettersPattern = new RegExp(
      '^(?:([' + `${randomLetters.join('').toLowerCase()}` + '])(?!.*\\1))*$'
    );
    if (randomLettersPattern.test(e.currentTarget.value))
      setInputValue(e.currentTarget.value);
    console.log(inputValue);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    if (correctGuessedWords.includes(inputRef.current.value.toLowerCase()) || incorrectGuessedWords.includes(inputRef.current.value.toLowerCase())) {
      dispatch(setAlert("You've already guessed this word!"))
      return;
    }

    if (englishWords.includes(inputRef.current.value.toLowerCase())) {
      dispatch(setCorrectGuessedWords(inputRef.current.value.toLowerCase()))
      dispatch(setScore(score + 10))
      dispatch(setAlert("Nice one!"))
    }
    else {
      dispatch(setScore(score - 5))
      dispatch(setIncorrectGuessedWords(inputRef.current.value.toLowerCase()))
      dispatch(setAlert("Whoops! That word doesn't exist."))
    }

  }

  //  console.log(inputRef.current.value);
  // if inputRef.current.value isn't a word, decrease score by 5, else  increase 10

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
