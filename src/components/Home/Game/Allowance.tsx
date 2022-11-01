import { selectScore, selectIsActiveState } from '@slices/gameSlice';
import { useSelector } from 'react-redux';

const Score = () => {
  const score: number = useSelector(selectScore);
  const isActive = useSelector(selectIsActiveState);
  return (
    <>

      {isActive &&
        <div className="py-4 flex flex-row content-center justify-center text-white text-center text-1xl uppercase">
          <span className="px-4 py-4 bg-primary-900 rounded-md">Allowance: {score}</span>
        </div>

      }
    </>

  );
};

export default Score;
