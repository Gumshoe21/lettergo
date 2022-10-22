import { useState } from 'react';


const Letters = ({randomLetters}) => {
  const [letters, setLetters] = useState(randomLetters)
	return (
		<div className="letters--container">
			{letters.map(letter => (
				<span key={letter} className="letters--letter">
					{letter}
				</span>
			))}
		</div>
	);
};



export default Letters;
