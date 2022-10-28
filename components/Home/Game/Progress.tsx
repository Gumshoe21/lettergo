import {
	selectIsActiveState,
	setIsActive,
	selectRandomLetters,
	setRandomLetters,
	selectPossibleWords,
	selectWordsPerLetterLength
} from '../../../store/slices/gameSlice';
import { useSelector } from 'react-redux';

const Progress = () => {
	const possibleWords = useSelector(selectPossibleWords);
	const isActive = useSelector(selectIsActiveState);
	const wordsPerLetterLength = useSelector(selectWordsPerLetterLength);

	return (
		<div className="progress--container">
			<div className="progress--manifest">
				{isActive &&
					Object.keys(wordsPerLetterLength).map((key, index) => {
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
