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

    dispatch(
      setActiveGameStates({
        possibleWords,
        randomLetters,
        wordsPerLetterLength
      })
    );
  };

  return (
    <div className="flex flex-row content-center justify-around py-2">
      <Allowance />
      <div className="py-4 flex flex-row content-center justify-center text-white text-center text-1xl uppercase">
        <button
          className={`h-[50px] font-semibold text-white flex flex-row justify-center content-center items-center p-5 rounded-r-3xl rounded-l-3xl bg-primary-500  hover:bg-white hover:text-primary-900 hover:-translate-y-0.5 hover:transition-all hover:drop-shadow-xl ${isActiveState ? 'disabled' : ''}`}
          disabled={isActiveState ? true : false}
          onClick={activateGame}
        >
          New Game
        </button>
      </div>
    </div>
  );
};;
export default NewGame
