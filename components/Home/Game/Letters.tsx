import { useState } from 'react';
import { wrapper } from '../../../store/index';
import {
	selectIsActiveState,
	setIsActive,
	selectRandomLetters,
	setRandomLetters
} from '../../../store/slices/gameSlice';
import { useSelector } from 'react-redux';
import { gameSlice } from '../../../store/slices/gameSlice';

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
const getServerSideProps = wrapper.getServerSideProps(
	store =>
		async ({ params }) => {
			// store.getState()
			return {
				props: {
					isActive,
					randomLetters
				}
			};
		}
);

export default Letters;