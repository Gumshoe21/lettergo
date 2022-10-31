import { selectScore, selectIsActiveState } from '@slices/gameSlice';
import { useSelector } from 'react-redux';

const Score = () => {
	const score: number = useSelector(selectScore);
	const isActive = useSelector(selectIsActiveState);
	return (
		<div className="text-white text-center text-4xl">
			Allowance: {isActive && score}
		</div>
	);
};

export default Score;
