import { HYDRATE } from 'next-redux-wrapper'
import { createSlice} from '@reduxjs/toolkit'
import { AppState } from '../index'

export interface GameState {
	isActive: boolean;
	isOver: boolean;
	randomLetters?: string[]
}

const initialState: GameState = {
	isActive: false,
	isOver: false,
}

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setIsActive(state,action) {
			state.isActive = !state.isActive; 
		}
	},
	extraReducers: {
		// the HYDRATE fucnction will be called when:
		// -you navigate from one page to another
		// getStaticProps or getServerSideProps functions are called
		// the payload contains the state *at the moment of static generation or server-side rendering
		// the reducer merges it with the existing client state.
		[HYDRATE]: (state,action) => {
			return {
				...state,
				...action.payload.game,
			};
		}
	}
});

export const { setIsActive} = gameSlice.actions;
export const selectIsActiveState = (state: AppState) => state.game.isActive;

export default gameSlice.reducer;
