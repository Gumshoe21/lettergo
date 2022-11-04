import { useDispatch, useSelector } from "react-redux";
import {
  selectIsActiveState,
  setIsActive,
  setActiveGameStates,
  selectIsOver,
  setIsOver,
  GameState
} from '@slices/gameSlice'
import { englishWords } from '@utils/englishWords'
import _ from 'lodash';
import Allowance from '@game/Allowance'
import Alert from '@game/Alert'

const NewGame = ({ }: {}) => {

  const dispatch = useDispatch();
  const isActive = useSelector(selectIsActiveState);
  const isOver = useSelector(selectIsOver);

  const activateGame = (): void => {
    const alphabet: string[] = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ];
    const randomLetters = _.shuffle(alphabet).slice(14, 26) as string[];

    let possibleWords = englishWords.filter(word =>
      word.match(
        new RegExp(
          '^(?:([' +
          `${randomLetters.join('').toLowerCase()}` +
          '])(?!.*\\1))*$'
        )
      )
    ) as string[];

    let wordsPerLetterLength: GameState['wordsPerLetterLength'] = {};
    for (let i = 0; i < possibleWords.length; i++) {
      wordsPerLetterLength[possibleWords[i].length] ||= [];
      wordsPerLetterLength[possibleWords[i].length].push(possibleWords[i]);
    }

    interface keyNumVal {
      [key: string]: number
    }

    let wordCountPerLetterLength: keyNumVal = {}
    for (let i = 0; i < possibleWords.length; i++) {
      wordCountPerLetterLength[possibleWords[i].length] ||= 0;
      wordCountPerLetterLength[possibleWords[i].length] += 1
    }

    dispatch(
      setActiveGameStates({
        possibleWords,
        randomLetters,
        wordsPerLetterLength,
        wordCountPerLetterLength
      })
    );
  };

  const giveUp = () => {
    dispatch(setIsActive(false))
    dispatch(setIsOver(true))
  }
  return (
    <div className={`flex flex-row content-center justify-stretch ${isActive ? 'justify-between' : 'justify-center'} py-2 px-4`}>
      {isActive && <Allowance />}
      {isActive && <Alert />}
      <div className="py-4 flex flex-row content-center justify-center text-white text-center uppercase">
        <button
          className={`text-xl font-mono tracking-tigher text-white flex flex-row justify-center content-center items-center py-2 px-4 rounded-r-md rounded-l-md bg-primary-600  hover:bg-white hover:text-primary-900  hover:transition-all hover:drop-shadow-xl ${isActive ? 'disabled' : ''}`}
          onClick={!isActive ? activateGame : giveUp}
        >
          {!isActive && !isOver && 'New Game'}
          {isActive && !isOver && 'Give Up?'}
          {isOver && !isActive && 'Try Again?'}
        </button>
      </div>
    </div>
  );
};

export default NewGame
