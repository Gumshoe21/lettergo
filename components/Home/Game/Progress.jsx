const Progress = () => {
	return (
		<div className="progress--container">
			<div className="progress--manifest">
				<span>230 possible words</span>
				<span>70 5 letter words</span>
				<span>120 4 letter words</span>
			</div>
			<div className="progress--attempted-words">
				<span className="text-green-700">Colour</span>
				<span className="text-green-700">Colour</span>
				<span className='text-red-700'>Lourco</span>			<span className="text-green-700">Colour</span>
			</div>
		</div>
	)
}
export default Progress;