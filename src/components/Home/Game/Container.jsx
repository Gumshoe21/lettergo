const Container = ({ children }) => {
  return (
		<div className="max-w-2xl h-screen mx-auto ">
			<div className="flex flex-col content-center rounded-xl align-center bg-[rgb(255,255,255,0.02)]">
				{children}
			</div>
		</div>
	);
}

export default Container;
