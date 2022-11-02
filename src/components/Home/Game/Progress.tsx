import {
  selectIsActiveState,
  selectWordsPerLetterLength,
  selectWordCountPerLetterLength
} from '@slices/gameSlice';
import { useSelector } from 'react-redux';
import { Arima } from '@next/font/google'

const arima = Arima()

const Progress = () => {
  const isActive = useSelector(selectIsActiveState);
  const wordsPerLetterLength = useSelector(selectWordsPerLetterLength);
  const wordCountPerLetterLength = useSelector(selectWordCountPerLetterLength);

  return (
    <div className="flex flex-col items-center content-center gap-2">
      <div className={`uppercase text-white text-3xl ${arima.className}  tracking-wide`}>Words to Find:</div>
      <div className="flex flex-wrap justify-center text-center gap-2 text-white">

        {isActive &&
          Object.keys(wordsPerLetterLength).map((key, _index) => {
            return (
              <div className='font-serif uppercase border-black border-2 rounded-lg flex flex-col items-center justify-center content-center'>
                <span key={key} className='text-1xl'>
                  {key} letters:&nbsp;
                </span>
                <span className='text-3xl'>
                  {wordCountPerLetterLength[key]}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Progress;
