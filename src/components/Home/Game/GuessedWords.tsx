import { ReactNode } from 'react';
import {
  selectIncorrectGuessedWords,
  selectCorrectGuessedWords,
  selectIsActiveState
} from '@slices/gameSlice'
import { useSelector } from 'react-redux';

export type Props = {
  children: ReactNode,
  correct: boolean,
}

const GuessedWords = () => {

  const Word = ({ children, ...props }: Props) => {
    return (
      <div className={`flex justify-center content-center text-slate-900 text-center ${props.correct ? 'bg-green-400' : 'bg-red-400'
        } rounded-md uppercase`}><span className='px-4'>{children}</span></div>
    )
  }

  const correctGuessedWords = useSelector(selectCorrectGuessedWords)
  const incorrectGuessedWords = useSelector(selectIncorrectGuessedWords)
  const isActive = useSelector(selectIsActiveState)

  return (
    <div className={`grid grid-cols-2 grid-col-flow gap-2 ${correctGuessedWords.length > 0 || incorrectGuessedWords.length > 0 ? 'pb-4' : ''}`}>
      {/* Correct guesses */}
      <div className='flex content-start items-center justify-center flex-wrap gap-1'>
        {isActive && correctGuessedWords.map(word =>
          <Word correct={true}>{word}</Word>

        )}

      </div>
      {/* Incorrect guesses */}
      <div className='flex content-start items-center justify-center flex-wrap gap-1'>
        {isActive && incorrectGuessedWords.map(word =>
          <Word correct={false}>{word}</Word>
        )}
      </div>
    </div>
  )
}

export default GuessedWords;
