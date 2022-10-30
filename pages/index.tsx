import Navbar from '@ui/Navbar';
import Score from '@game/Score';
import GuessedWords from '@game/GuessedWords'
import Container from '@game/Container';
import Letters from '@game/Letters';
import Countdown from '@game/Countdown';
import Input from '@game/Input';
import Progress from '@game/Progress';
import NewGame from '@game/NewGame';
import WelcomeModal from '@game/WelcomeModal';
import { connect } from "react-redux";

const Home = () => {
  return (
    <>
      <Navbar />
      <Container>
        <NewGame />
        <Score />
        <Countdown />
        <Progress />
        <WelcomeModal />
        <Input />
        <Letters />
        <GuessedWords />
      </Container>
    </>
  );
};
/*
export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ params }) => {
      return {
        props: {
          isActive: false,
          wordsPerLetterLength: {}
        }
      };
    }
);
*/
export default connect()(Home);
