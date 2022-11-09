import prisma from '@lib/prisma'
import { GetStaticProps } from 'next';
import Image from 'next/image'
export const getStaticProps: GetStaticProps = async () => {
  // Select all games and sort by descending order with distinct users. 
  // Effectively yields only the highest scores from each user, forming a leaderboard.
  const games = await prisma.game.findMany({
    distinct: ['userId'],
    orderBy: {
      score: 'desc',
    },
    include: {
      player: true
    }
  }
  );
  return {
    props: {
      games: JSON.parse(JSON.stringify(games))
    }
  };
};

const Leaderboard = (props) => {
  return (
    <div className="px-8 sm:px-48 lg:px-96 max-w-7xl mx-auto">
      <div className="mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 rounded-lg">
        <table className="min-w-full divide-y divide-gray-400">
          <thead className="bg-primary-700">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">Player</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-white sm:table-cell">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-500 bg-gray-800">
            {props.games.map(g => (
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6"><div className='flex gap-2 items-center'><Image alt='Player avatar.' className='inline' src={`${g.player.image}`} width='48' height='48' /><span className='font-mono text-md'>{g.player.name}</span></div></td>
                <td className="whitespace-nowrap px-5 py-4 text-right text-sm text-white sm:table-cell">{g.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Leaderboard;
