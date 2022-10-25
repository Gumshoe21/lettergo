import { useState, useEffect } from 'react'
import { setEnvironmentData } from 'worker_threads';

const WelcomeModal = () => {
	const [modalVisible, setModalVisible] = useState(false)

  const closeModalHandler = () => {
		localStorage.setItem('modalVisible', 'false');
		setModalVisible(false);
	};
	useEffect(() => {
		let modal_visible = localStorage.getItem('modalVisible');
		if (!modal_visible || modal_visible === 'true') {
			setModalVisible(true);
			localStorage.setItem('modalVisible', 'true');
		}
	}, []);
	if (!modalVisible) return null;

	return (
		<div
			className={`${
				!modalVisible && modalVisible !== 'false' ? 'hidden' : ''
			} relative z-10 aria-labelledby="modal-title" role="dialog" aria-modal="true"`}
		>
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
			<div className="fixed inset-0 z-10 overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
					<div className="animate-[fadeIn_1s_ease-in-out] relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
						<div className="flex">
							<div className="flex flex-col gap-3 mt-3 text-center sm:mt-5">
								<h3
									className="text-4xl font-md leading-6 text-gray-900 "
									id="modal-title"
								>
									LetterGo
								</h3>
								<div className="mt-2">
									<p className="text-sm text-gray-500">
										The game that tests your ability to improvise using your
										vocabulary knowledge and 12 random letters.
									</p>
								</div>
							</div>
						</div>
						<div>
							<button
								type="button"
								onClick={() => closeModalHandler()}
								className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base  text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-lg uppercase tracking-widest "
							>
								Start Playing
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WelcomeModal;