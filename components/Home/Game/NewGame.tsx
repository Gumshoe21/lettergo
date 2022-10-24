import { useDispatch, useSelector } from "react-redux";
import { setIsActive, selectIsActiveState } from "../../../store/slices/gameSlice";

const NewGame = ({
}:{
}) => {

	const dispatch = useDispatch()
	const isActive = useSelector(selectIsActiveState)
	const activateGame = () => {
		dispatch(setIsActive()) 
	//	console.log(isActive)
	}

	return (
		<div className="new-game--container">
			<button className={`new-game--button ${isActive ? 'disabled' : ''}`} disabled={isActive ? true : false} onClick={activateGame}>
			New Game
			</button>
		</div>
	)
}
export default NewGame