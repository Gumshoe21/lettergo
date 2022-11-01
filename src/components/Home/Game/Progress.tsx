import {
  selectIsActiveState,
  selectWordsPerLetterLength
} from '@slices/gameSlice';
import { useSelector } from 'react-redux';
import { Arima } from '@next/font/google'

const arima = Arima()

const Progress = () => {
  const isActive = useSelector(selectIsActiveState);
  const wordsPerLetterLength = useSelector(selectWordsPerLetterLength);

  return (
    <div className="flex flex-col items-center content-center gap-2">
      <div className={`uppercase text-white text-4xl ${arima.className}  tracking-wide`}>P Words to Find:</div>
      <div className="flex flex-wrap justify-center text-center gap-2 text-white">

        {isActive &&
          Object.keys(wordsPerLetterLength).map((key, _index) => {
            return (
              <div className='border-black border-2 rounded-lg flex flex-row items-center justify-center content-center'>

                <span key={key}>
                  {key} letters:&nbsp;
                  {wordsPerLetterLength[key].length}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Progress;
