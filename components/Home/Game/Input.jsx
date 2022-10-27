import { useRef } from 'react';
import {
	selectIsActiveState,
	setIsActive,
	selectRandomLetters,
	setRandomLetters,
} from '../../../store/slices/gameSlice';
import { useSelector } from 'react-redux';

const Input = () => {
	const inputRef = useRef(null);
	const isActiveState = useSelector(selectIsActiveState);
	const randomLettersState = useSelector(selectRandomLetters);
	const handleOnSubmit = () => {
		console.log(inputRef.current.value);
		inputRef.current.value = '';
	};

	return (
		<div className="input--container">
			<input
				ref={inputRef}
				className="py-2 text-center rounded-lg shadow-sm focus:ring-[5px] transition-all focus:ring-purple-400 sm:text-5xl uppercase outline-none"
			/>

			<button
				className="input--submit-button"
				type="submit"
				onClick={() => handleOnSubmit()}
			>
				Submit
			</button>
		</div>
	);
};

export default Input;
