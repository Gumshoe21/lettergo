const Container = ({ children }) => {
  return (
    <div className="max-w-2xl h-screen mx-auto">
      <div className='flex flex-col content-center align-center'>
        {children}
      </div>
    </div>
  )
}

export default Container;
