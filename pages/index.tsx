import React from 'react';
import type { NextPage } from 'next';
import Navbar from '../components/UI/Navbar'
import Container from '../components/Home/Game/Container'
import Letters from '../components/Home/Game/Letters'
import Countdown from '../components/Home/Game/Countdown'

const Home = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Letters />
        <Countdown />

      </Container>

    </>
  )
};

export default Home;
