const Container = ({ children }) => {
  return (
    <div className="h-screen mx-auto max-w-lg px-2 py-4 md:mt-6">
      <div className="flex flex-col flex-1 items-stretch rounded-xl align-center bg-[rgb(255,255,255,0.02)]">
        {children}
      </div>
    </div>
  );
}

export default Container;
