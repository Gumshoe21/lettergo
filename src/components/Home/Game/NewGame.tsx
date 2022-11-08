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

const NewGame = () => {

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

  return (
    <>
      {!isActive &&
        <div className={`flex flex-row ${isActive ? 'justify-between' : 'justify-center'}`}>
          <div className='flex items-center justify-center text-center px-4 py-4'>
            <span
              className={` cursor-pointer font-semibold text-white flex flex-row py-3 px-3  rounded-r-md rounded-l-md bg-primary-600  hover:bg-white hover:text-primary-900 hover:-translate-y-0.5 hover:transition-all hover:drop-shadow-xl ${isActive ? 'disabled' : ''}`}
              onClick={!isActive && activateGame}
            >
              {!isActive && !isOver && 'New Game'}
              {isOver && !isActive && 'Try Again?'}
            </span>
          </div>
        </div>

      }
    </>
  );
};

export default NewGame
