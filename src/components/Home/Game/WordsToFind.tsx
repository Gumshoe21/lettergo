import {
  selectIsActiveState,
  selectWordsPerLetterLength,
  selectWordCountPerLetterLength
} from '@slices/gameSlice';
import { useSelector } from 'react-redux';
import { Arima } from '@next/font/google'

const arima = Arima()

const WordsToFind = () => {
  const isActive = useSelector(selectIsActiveState);
  const wordsPerLetterLength = useSelector(selectWordsPerLetterLength);
  const wordCountPerLetterLength = useSelector(selectWordCountPerLetterLength);

  return (
    <div className="flex flex-col items-center content-center gap-4">
      <div className={`uppercase text-white text-3xl ${arima.className}  tracking-wide`}>Words Left:</div>
      <div className="flex flex-wrap justify-center text-center gap-4 text-white">

        {isActive &&
          Object.keys(wordsPerLetterLength).map((key, _index) => {
            return (
              <div key={key} className='text-1xl animate-[fadeIn_1s_ease-in-out] font-serif uppercase gap-2 rounded-lg flex flex-col items-center justify-center content-center'>
                <span className='text-1xl'>
                  {key} letters:&nbsp;
                </span>
                <span className='text-3xl animate-[fadeIn_1.75s_ease-in-out] transition-all  '>
                  {wordCountPerLetterLength[key]}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default WordsToFind;
