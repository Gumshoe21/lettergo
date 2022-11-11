import Image from 'next/image'
const HowToPlay = () => {
  return (
    <div className="max-w-xl h-[calc(100vh-73.98px)] mx-auto flex justify-center items-center">
      <div className="flex flex-col content-center rounded-xl align-center">
        <div className='text-white text-xl flex flex-col items-center text-center gap-8 justify-start h-[calc(100vh-82px)] py-16'>
          <div className='text-6xl'>How to Play <span className='font-serif'>LetterGo</span></div>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div><Image width='480' height='200' alt='Gif showing how to start a new game of LetterGo.' src='/images/start-game-gif.gif' /></div>

            <div className='text-3xl'>The Rules:</div>
            <div>You&apos;re given 12 random letters.
              Your goal is to form as many words as possible using the letters provided without before the time runs out.</div>
            <div className='text-3xl'>Some considerations and limitations:</div>
            <ul className='flex flex-col gap-2 list-outside text-left list-disc pb-20'>
              <li>You can only form heterograms; this means you can only use each letter once when forming a word.</li>
              <li>Each time you guess a word, the the letters you used are replaced with new letters.</li>
              <li>Each correct guess grants you 5 extra seconds on the timer.</li>
              <li>And, of course, the most important notion of all: have fun!</li>
            </ul>
          </div>
        </div>

      </div>
    </div >
  )
}

export default HowToPlay;
