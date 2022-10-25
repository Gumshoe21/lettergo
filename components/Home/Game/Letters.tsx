import { useState } from 'react';
import { wrapper } from '../../../store/index';
import {
	selectIsActiveState,
	setIsActive,
} from '../../../store/slices/gameSlice';
import { useSelector} from 'react-redux'
import { gameSlice } from '../../../store/slices/gameSlice';
const Letters = ({
	randomLetters,
}: {
	randomLetters: string[];
}) => {

	const isActive = useSelector(selectIsActiveState)
	const [letters, setLetters] = useState(randomLetters)
	return (
		<div className="letters--container">
			{letters.map(letter => (
				<span key={letter} className="letters--letter">
					{letter}
				</span>
				)
			)}
		</div>
	);
};
const getServerSideProps = wrapper.getServerSideProps (
	store =>
		async ({ params }) => {
			store.getState()
			return {
				props: {
					isActive
				},
			};
		},
);

export default Letters;
