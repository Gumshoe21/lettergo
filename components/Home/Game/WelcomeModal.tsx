import { useState} from 'react'
import { setEnvironmentData } from 'worker_threads';


const WelcomeModal = () => {
	const [modalHidden, setModalHidden] = useState(false)
	return (
<div className={`${modalHidden ? 'hidden' : ''} -all relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true`}>
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="animate-[fadeIn_1s_ease-in-out] relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
        <div>
          
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-4xl font-md leading-6 text-gray-900 " id="modal-title">LetterGo</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">The game that tests your ability to improvise using your vocabulary knowledge and 12 random letters.</p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm">Deactivate</button>
          <button type="button" onClick={() => setModalHidden(true)} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>

	)
}

export default WelcomeModal;