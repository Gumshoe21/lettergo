import prisma from '@lib/prisma'
import { GetStaticProps } from 'next'
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
      player: true,
    },
  })
  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
    },
  }
}
export type GameProps = {
  id: string
  score: number
  player: {
    name: string
    email: string
    image: string
  } | null
}

type Props = {
  games: GameProps[]
}
const Leaderboard: React.FC<Props> = ({ games }) => {
  return (
    <div className='mt-8 px-8 lg:px-36 max-w-7xl mx-auto'>
      <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5   rounded-lg'>
        <table className='min-w-full divide-y divide-gray-400'>
          <thead className='bg-primary-700'>
            <tr>
              <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                Player
              </th>
              <th scope='col' className='px-3 py-3.5 text-right text-sm font-semibold text-white sm:table-cell'>
                Score
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-500 bg-gray-800'>
            {games.map((g: any) => (
              <tr key={g}>
                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6'>
                  <div className='flex gap-2 items-center'>
                    <Image alt='Player avatar.' className='inline' src={`${g.player.image}`} width='48' height='48' />
                    <span className='font-mono text-md'>{g.player.name}</span>
                  </div>
                </td>
                <td className='whitespace-nowrap px-5 py-4 text-right text-sm text-white sm:table-cell'>{g.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
