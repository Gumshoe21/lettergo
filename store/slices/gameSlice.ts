import { HYDRATE } from 'next-redux-wrapper'
import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../index';

export interface GameState {
	isActive: boolean;
	isOver: boolean;
	randomLetters: string[];
	possibleWords: string[];
	wordsPerLetterLength: {
		[key: string]: string[];
	};
	score: number;
}

const initialState: GameState = {
	isActive: false,
	isOver: false,
	randomLetters: [],
	possibleWords: [],
	wordsPerLetterLength: {},
	score: 30
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setIsActive(state, action) {
			state.isActive = action.payload;
		},
		setRandomLetters(state, action) {
			state.randomLetters = action.payload;
		},
		setPossibleWords(state, action) {
			state.possibleWords = action.payload;
		},
		setWordsPerLetterLength(state, action) {
			state.wordsPerLetterLength = action.payload;
		},
		setActiveGameStates(state, action) {
			state.randomLetters = action.payload.randomLetters;
			state.possibleWords = action.payload.possibleWords;
			state.wordsPerLetterLength = action.payload.wordsPerLetterLength;
			state.isActive = true;
		},
		setScore(state, action) {
			state.score = action.payload;
		}
	},
	extraReducers: {
		// the HYDRATE fucnction will be called when:
		// -you navigate from one page to another
		// getStaticProps or getServerSideProps functions are called
		// the payload contains the state *at the moment of static generation or server-side rendering
		// the reducer merges it with the existing client state.
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.game
			};
		}
	}
});

export const {
	setIsActive,
	setRandomLetters,
	setPossibleWords,
	setWordsPerLetterLength,
	setActiveGameStates,
	setScore
} = gameSlice.actions;

export const selectIsActiveState = (state: AppState) => state.game.isActive;
export const selectRandomLetters = (state: AppState) =>
	state.game.randomLetters;
export const selectPossibleWords = (state: AppState) =>
	state.game.possibleWords;
export const selectWordsPerLetterLength = (state: AppState) =>
	state.game.wordsPerLetterLength;
export const selectScore = (state: AppState) => state.game.score;


export default gameSlice.reducer;
