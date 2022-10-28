import { useDispatch, useSelector } from "react-redux";
import {
	setIsActive,
	selectIsActiveState,
	setRandomLetters,
	selectRandomLetters,
	setPossibleWords,
	selectPossibleWords,
	setWordsPerLetterLength,
	selectWordsPerLetterLength,
	setActiveGameStates
} from '../../../store/slices/gameSlice';
import { GameState } from '../../../store/slices/gameSlice';
import { englishWords } from '../../../utils/englishWords';
import _, { words } from 'lodash';
import { useEffect } from 'react';

const NewGame = ({}: {}) => {
	const dispatch = useDispatch();

	const isActiveState = useSelector(selectIsActiveState);
	const randomLettersState = useSelector(selectRandomLetters);
	const possibleWordsState = useSelector(selectPossibleWords);
	const wordsPerLetterLengthState = useSelector(selectWordsPerLetterLength);

	const activateGame = async (): string[] => {
		const alphabet: string[] = [
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z'
		];
		const randomLetters = _.shuffle(alphabet).slice(14, 26) as string[];

		let possibleWords = englishWords.filter(word =>
			word.match(new RegExp(/^(?:([dog])(?!.*\1))*$/))
		) as string[];

		let wordsPerLetterLength: GameState['wordsPerLetterLength'] = {};
		for (let i = 0; i < possibleWords.length; i++) {
			wordsPerLetterLength[possibleWords[i].length] ||= [];
			wordsPerLetterLength[possibleWords[i].length].push([possibleWords[i]]);
		}

		dispatch(
			setActiveGameStates({
				possibleWords,
				randomLetters,
				wordsPerLetterLength
			})
		);
	};

	return (
		<div className="new-game--container">
			<button
				className={`new-game--button ${isActiveState ? 'disabled' : ''}`}
				disabled={isActiveState ? true : false}
				onClick={activateGame}
			>
				New Game
			</button>
		</div>
	);
};;
export default NewGame