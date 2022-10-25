import { useRef } from 'react';

const Input = () => {

  const inputRef = useRef(null)


  const handleOnSubmit = () => {
    console.log(inputRef.current.value)
    inputRef.current.value = ''
  }

  return (
    <div className='input--container'>
  <input ref={inputRef} type="email" name="email" id="email" class="py-4 text-center rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-5xl uppercase" />

      <button className='input--submit-button' type='submit' onClick={() => handleOnSubmit()}>Submit</button>
    </div>
  );
};

export default Input;
