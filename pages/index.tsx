import type { NextPage } from 'next';
import Navbar from '../components/UI/Navbar';
import Container from '../components/Home/Game/Container';
import Letters from '../components/Home/Game/Letters';
import Countdown from '../components/Home/Game/Countdown';
import Input from '../components/Home/Game/Input';
import Progress from '../components/Home/Game/Progress';
import NewGame from '../components/Home/Game/NewGame';
import { wrapper } from './../store/index';
import {connect} from "react-redux";
import {
	selectIsActiveState,
	setIsActive,
	selectRandomLetters,
	setRandomLetters
} from './../store/slices/gameSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import WelcomeModal from '../components/Home/Game/WelcomeModal';

const Home = ({ randomLetters }: { randomLetters: string[] }) => {
	const isActiveState = useSelector(selectIsActiveState);
	const randomLettersState = useSelector(selectRandomLetters);
	return (
		<>
			<Navbar />
			<Container>
				<NewGame />
				<Countdown />
				<Progress />
				<WelcomeModal />
				<Input />
				<Letters />
			</Container>
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	store =>
		async ({ params }) => {
			//    await store.dispatch(setIsActiveState(true));

			return {
				props: {
					isActive: false,
					wordsPerLetterLength: {}
				}
			};
		}
);

export default connect()(Home);
