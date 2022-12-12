import Image from 'next/image'
const HowToPlay = () => {
  return (
    <div className='max-w-xl h-[calc(100vh-73.98px)] mx-auto flex justify-center items-center'>
      <div className='flex flex-col content-center rounded-xl align-center'>
        <div className='text-white text-xl flex flex-col items-center text-center gap-8 justify-start h-[calc(100vh-82px)] py-16'>
          <div className='text-6xl'>
            How to Play <span className='font-serif'>LetterGo</span>
          </div>
          <div>
            <Image width='480' height='200' alt=' Gif showing how to start a new game of LetterGo.' src='/images/demo.gif' />
          </div>
          <div>Your goal is to form as many words as possible using the letters provided before the timer runs out.</div>
          <div>There are a few considerations and limitations:</div>
          <ul className='flex flex-col gap-2 list-outside text-left list-disc pb-20'>
            <li>You can only form heterograms; this means you can only use each letter once when forming a word.</li>
            <li>When you guess a real word, the timer is extended by 5 seconds .</li>
            <li>When you guess a word that doesn&apos;nt exist, the timer is substracted by 5 seconds.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HowToPlay
