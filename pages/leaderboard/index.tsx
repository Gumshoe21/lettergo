import prisma from '../../../lib/prisma'
import { GetServerSideProps } from 'next';

const Leaderboard = (props) => {
  return (
    <div>{props.games[0].score}</div>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const games = await prisma.game.findMany();
  return {
    props: {
      games
    }
  };
};
export default Leaderboard;
