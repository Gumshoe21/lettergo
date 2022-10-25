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
import { selectIsActiveState, setIsActive} from "./../store/slices/gameSlice"
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from 'react'

import _ from 'lodash';
import WelcomeModal from '../components/Home/Game/WelcomeModal';


const Home= ({ 
		randomLetters, 
	}: {

		randomLetters: string[], 
	}) => {


	const isActiveState = useSelector(selectIsActiveState)
	return (
		<>
			<Navbar />
			<Container>
				
				<NewGame isActive={isActiveState} />
				<Countdown />
				<Progress />
				<WelcomeModal/>
				<Input />
				<Letters randomLetters={randomLetters} />
				
			</Container>
		</>
	);
};

export const getServerSideProps= wrapper.getServerSideProps(

  (store) =>

    async ({ params }) => {
  		//    await store.dispatch(setIsActiveState(true)); 
 			console.log("State on server", store.getState());
			console.log(store)
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
			'Z',
		];

		const randomLetters: string[] = _.shuffle(alphabet).slice(14, 26);
      return {
        props: {
					randomLetters,
					isActive:false,
        },
      };
    }
);

export default connect()(Home);
