import {
  selectAlert,
  setAlert,
  selectCorrectGuessedWords,
  selectPossibleWords,
  selectScore,
  setIsActive,
  setIsOver
} from '@slices/gameSlice'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';


const Alert = () => {
  const dispatch = useDispatch()
  const alert = useSelector(selectAlert)
  const correctGuessedWords = useSelector(selectCorrectGuessedWords)
  const possibleWords = useSelector(selectPossibleWords)
  const score = useSelector(selectScore)

  // If the player has guessed all possible words, alert 
  const setWinAlert = useEffect(() => {
    if (correctGuessedWords.length === possibleWords.length) {
      dispatch(setAlert("You got 'em all! That's amazing! You're a true wordsmith."))
    }
  }, [correctGuessedWords])


  return (
    <div>

      <div className='text-white'>{alert}</div>
    </div>
  )

}
export default Alert;
