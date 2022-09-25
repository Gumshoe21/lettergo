import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	return (
		<>
			<main>
				<nav className="flex items-center justify-between px-4 py-3 bg-gray-900">
					<h4 className="text-1xl font-bold text-center">How to Play</h4>
					<h3 className="text-3xl font-bold text-center">LetterGo</h3>
					<h4 className="text-1xl font-bold text-center">About</h4>
				</nav>
				<div className="text-6xl font-bold text-center tracking-[.25rem] uppercase py-24">
					Ostentatious
				</div>
				<div className="flex items-center justify-center flex-col">
					<input type="text" className="bg-gray-50 border mb-4 rounded-md" />
				</div>
			</main>
		</>
	);
};

export default Home;
