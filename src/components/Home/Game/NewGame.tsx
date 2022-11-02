import { useDispatch, useSelector } from "react-redux";
import {
  selectIsActiveState,
  setActiveGameStates,
  selectScore,
  GameState
} from '@slices/gameSlice'
import { englishWords } from '@utils/englishWords'
import _ from 'lodash';
import Allowance from '@game/Allowance'
import Alert from '@game/Alert'

const NewGame = ({ }: {}) => {
  const dispatch = useDispatch();

  const isActiveState = useSelector(selectIsActiveState);
  const score = useSelector(selectScore)
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

  return (
    <div className={`flex flex-row content-center ${isActiveState ? 'justify-between' : 'justify-center'} py-2 px-4`}>
      {isActiveState && <Allowance />}
      {isActiveState && <Alert />}
      <div className="py-4 flex flex-row content-center justify-center text-white text-center text-1xl uppercase">
        <button
          className={`font-semibold text-white flex flex-row justify-center content-center items-center py-2 px-4 rounded-r-md rounded-l-md bg-primary-500  hover:bg-white hover:text-primary-900 hover:-translate-y-0.5 hover:transition-all hover:drop-shadow-xl ${isActiveState ? 'disabled' : ''}`}
          disabled={isActiveState ? true : false}
          onClick={activateGame}
        >
          {!isActiveState ? 'Start' : 'Give Up?'}
        </button>
      </div>
    </div>
  );
};;
export default NewGame
