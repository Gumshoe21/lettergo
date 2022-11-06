import { selectScore, selectIsActiveState } from '@slices/gameSlice';
import { useSelector } from 'react-redux';

const Score = () => {
  const score: number = useSelector(selectScore);
  const isActive = useSelector(selectIsActiveState);
  return (
    <>

      {isActive &&
<<<<<<< HEAD
        <div className="py-4 font-mono sm:text-md flex tracking-wide flex-row content-center justify-center text-white text-center text-xl">
          <span className="px-4 py-4 bg-primary-600 rounded-md">Allowance: <span className="text-white">{score}</span></span>
=======
        <div className="py-2 flex flex-row content-center justify-center text-white text-center text-1xl uppercase">
          <span className="px-4 py-2 bg-primary-900 rounded-md">{score}</span>
>>>>>>> e23f343 (chore: added timer; styling.)
        </div>

      }
    </>

  );
};

export default Score;
