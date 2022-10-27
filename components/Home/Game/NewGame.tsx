import { useDispatch, useSelector } from "react-redux";
import {
	setIsActive,
	selectIsActiveState,
	setRandomLetters,
	selectRandomLetters,
	setPossibleWords,
	selectPossibleWords,
	setWordsPerLetterLength,
	selectWordsPerLetterLength
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

	const generateRandomLetters = (): string[] => {
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

		return _.shuffle(alphabet).slice(14, 26) as string[];
	};

	const generatePossibleWords = (
		generatedRandomLetters: string[]
	): string[] => {
		let theAnswer = englishWords.filter(word =>
			word.match(new RegExp(/^(?:([dog])(?!.*\1))*$/))
		) as string[];
		console.log(theAnswer);
		return theAnswer;
	};

	const generateWordsPerLetterLength = (
		generatedPossibleWords: string[]
	): GameState['wordsPerLetterLength'] => {
		let lengths: GameState['wordsPerLetterLength'] = {};

		for (let i = 0; i < generatedPossibleWords.length; i++) {
			lengths[generatedPossibleWords[i].length] ||= [];

			lengths[generatedPossibleWords[i].length].push([
				generatedPossibleWords[i]
			]);
		}
		console.log('lengths:', lengths);
		return lengths as GameState['wordsPerLetterLength'];
	};

	const activateGame = async () => {
		dispatch(setIsActive());
		dispatch(setRandomLetters(generateRandomLetters()));
		dispatch(setPossibleWords(generatePossibleWords(randomLettersState)));
	};
	useEffect(() => {
		dispatch(
			setWordsPerLetterLength(generateWordsPerLetterLength(possibleWordsState))
		);
	}, [randomLettersState]);
	console.log(wordsPerLetterLengthState);
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
};
export default NewGame