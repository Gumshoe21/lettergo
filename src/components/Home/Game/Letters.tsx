import {
  selectIsActiveState,
  selectRandomLetters,
} from '@slices/gameSlice'
import { useSelector } from 'react-redux';

const Letters = () => {
  const randomLetters = useSelector(selectRandomLetters);
  const isActive = useSelector(selectIsActiveState);
  return (
    <>
      {isActive === true && randomLetters.length > 0 ? (
        <div className="letters--container">
          {randomLetters.map(letter => (
            <span key={letter} className="letters--letter">
              {isActive && letter}
            </span>
          ))}
        </div>
      ) : (
        <div className="letters--container">
          <span className="letters--letter"></span>
          <span className="letters--letter"></span>
          <span className="letters--letter"></span>
          <span className="letters--letter"></span>
          <span className="letters--letter"></span>
          <span className="letters--letter"></span>
          <span className="letters--letter"></span>
          <span className="letters--letter"></span>
          <span className="letters--letter"></span>
          <span className="letters--letter"></span>
          <span className="letters--letter"></span>
          <span className="letters--letter"></span>
        </div>
      )}
    </>
  );
};
export default Letters;
