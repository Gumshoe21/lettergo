const Container = ({ children }) => {
  return (
    <div className="h-screen mx-auto ">
      <div className="flex flex-col flex-1 items-stretch rounded-xl align-center bg-[rgb(255,255,255,0.02)]">
        {children}
      </div>
    </div>
  );
}

export default Container;
