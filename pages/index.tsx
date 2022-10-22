import React from 'react';
import type { NextPage } from 'next';
import Navbar from '../components/UI/Navbar'
import Container from '../components/Home/Game/Container'
import Letters from '../components/Home/Game/Letters'
import Countdown from '../components/Home/Game/Countdown'
import Input from '../components/Home/Game/Input'
import _ from 'lodash';

const Home = ({randomLetters}: any) => {
  return (
    <>
      <Navbar />
      <Container>
        <Letters randomLetters={randomLetters} />
        <Countdown/>
        <Input/>
      </Container>

    </>
  )
};
export const getStaticProps = async () => {
  const alphabet = [
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

  const randomLetters = _.shuffle(alphabet).slice(14, 26);

return {
  props: {
    randomLetters,
  },
};
};
export default Home;
