const Container = ({ children }) => {
  return (
    <div className="max-w-xl h-[calc(100vh-73.98px)] mx-auto flex justify-center items-center">
      <div className="flex flex-col content-center rounded-xl align-center bg-[rgb(255,255,255,0.02)]">
        {children}
      </div>
    </div>
  );
}

export default Container;
