import React, { useState , useCallback , useEffect } from 'react';
import './App.css';


function App() {

  const[length , setLength] = useState(6)
  const[numbers , setNumbers ] = useState(false)
  const[charaters , setCharaters ] = useState(false)
  const[password , setPasssword] =useState("")

  function handleSlider (e){
    setLength(e.target.value)
  } // Passing event to call setLength prop


  const handleCheckbox = () => {
    // Toggle the value when the checkbox is clicked
    setCharaters((prevValue) => !prevValue);
  };

  //numb,char,length needs to changed all together that's why
  //const cachedFn = useCallback(fn, dependencies)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) {
      str += "0123456789";
    }
    if (charaters) {
      str += "@#$!~";
    }
  
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
  
    setPasssword(() => pass); // Update state using the functional form of setState
  }, [length, numbers, charaters]); // Include dependencies used inside passwordGenerator
  
  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, charaters, setPasssword, passwordGenerator]);
  
  




  return (
    <div>
      <div className='outer-box'>
        <h1 className='white-bold'>Password generator</h1>
        <div className='inner-box'>
          <input
            className="password-input"
            type="text"
            value={password} //Password
            placeholder="Password"
            readOnly
          />
          <button 
          className='copy-button'>Copy</button>
        </div>
        <div>
          <input
            type='range'
            min={6}
            max={20}
           value={length}
           onChange={handleSlider}
         
          />
          <label className='label' >Length : {length} </label>
        </div>
        <div>
          <input 
            type='checkbox'
            onChange={handleCheckbox}
          />
          <label className='label'>Characters</label>
        </div>
        <div>
          <input 
            type='checkbox'
            onChange={ ()=> {setCharaters((prevValue)=> !prevValue)}}
          />
          <label className='label'>Numbers</label>
        </div>
      </div>
    </div>
  );
}

export default App
