import Image from 'next/image'
const HowToPlay = () => {
  return (
    <div className="max-w-xl h-[calc(100vh-73.98px)] mx-auto flex justify-center items-center">
      <div className="flex flex-col content-center rounded-xl align-center">





        <div className='text-white text-xl flex flex-col items-center text-center gap-16 justify-start h-[calc(100vh-82px)] py-16'>
          <div className='text-6xl'>How to Play <span className='font-serif'>LetterGo</span></div>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='text-3xl'>The rules are simple:</div>
            <div>At the beginning of the game, you're given <span className='text-green-500'>12 random letters</span>, as well as an allowance of&nbsp;
              <span className='text-green-500'>30 points:</span>
            </div>
            <div><Image width='480' height='200' alt=' Gif showing how to start a new game of LetterGo.' src='/images/start-game-gif.gif' /></div>
            <div>Your goal is to form as many words as possible using the letters provided without losing all your allowance.</div>
            <div>There are a few considerations and limitations:</div>
            <ul className='list-outside text-left list-disc'>
              <li>You can only form heterograms; this means you can only use each letter once when forming a word.</li>
              <li>Each time you guess a word that doesn't exist, your allowance is subtracted 10 points.</li>
              <li>When you guess a correct word, your allowance is increased by 10 points. </li>
              <li>If you lose all your points, the game is over.</li>
              <li>If you're feeling stumped, you can end the game by clicking the "Give Up?" button.</li>
              <li>And, of course, the most important rule of all: have fun.</li>
            </ul>
          </div>
        </div>

      </div>
    </div >
  )
}

export default HowToPlay;
