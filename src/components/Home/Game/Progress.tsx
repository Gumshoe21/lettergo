import {
  selectIsActiveState,
  selectWordsPerLetterLength
} from '@slices/gameSlice';
import { useSelector } from 'react-redux';

const Progress = () => {
  const isActive = useSelector(selectIsActiveState);
  const wordsPerLetterLength = useSelector(selectWordsPerLetterLength);

  return (
    <div className="progress--container">
      <div className="progress--manifest">
        {isActive &&
          Object.keys(wordsPerLetterLength).map((key, _index) => {
            return (
              <div className='flex flex-col'>
                <span className='py-4' key={key}>
                  {key} letter words:
                </span>
                <span>
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
