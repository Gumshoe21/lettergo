import { useRef } from 'react';

const Input = () => {

  const inputRef = useRef(null)


  const handleOnSubmit = () => {
    console.log(inputRef.current.value)
    inputRef.current.value = ''
  }

  return (
    <div className='input--container'>
      <input className='input--field' type="text" ref={inputRef} />
      <button className='input--submit-button' type='submit' onClick={() => handleOnSubmit()}>Submit</button>
    </div>
  );
};

export default Input;
