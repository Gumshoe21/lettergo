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
              <span key={key}>
                {key} letter words: {wordsPerLetterLength[key].length}
              </span>
            );
          })}
      </div>
    </div>
  );
};
export default Progress;
