import { selectScore, selectIsActiveState } from '@slices/gameSlice';
import { useSelector } from 'react-redux';

const Score = () => {
  const score: number = useSelector(selectScore);
  const isActive = useSelector(selectIsActiveState);
  return (
    <>

      {isActive &&
        <div className="py-4 font-mono sm:text-md flex tracking-wide flex-row content-center justify-center text-white text-center text-xl">
          <span className="px-4 py-4 bg-primary-600 rounded-md">Allowance: <span className="text-white">{score}</span></span>
        </div>

      }
    </>

  );
};

export default Score;
