import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const[numberAllow,setNumberAllow]=useState(false)
  const[charAllow,setCharAllow]=useState(false)
  const[password,setPassword]=useState("")

  const passwordGenerator= useCallback(()=>{
    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllow){
      str+="0123456789"
    }
    if(charAllow){
      str+="!@#$%^&*-_+="
    }
    for (let index = 1; index <= length; index++) {
      let char =Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  },[length,numberAllow,charAllow])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllow,charAllow])

 const passwordref= useRef(null)

 const copytoclipboard=useCallback(()=>{
  passwordref.current?.select();
 // passwordref.current?.setSelectionRange(0,3)
  window.navigator.clipboard.writeText(password)
 },[password])

  return (
    <>
    <h1 className='text-center text-4xl mb-4 px-4 text-white'>Password Generator</h1>
    <div className="w-full max-w-md mx-auto
      rounded-lg px-4 my-8">
    <input 
      type='text'
      value={password}
      className="outline-none w-full py-1 px-3 rounded-lg mb-1"
      placeholder='password'
      readOnly
      ref={passwordref}
      >
    </input>
    <button
      className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0 rounded-lg'
      onClick={copytoclipboard}
      >Copy</button>
   
   <div
   className='flex text-sm gap-x-2'>
    <div
    className='flex items-center gap-x-1'
    >
      <input
      type='range'
      min={6}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e)=>{setLength(e.target.value)}}
      ></input>
      <label className='text-orange-300'>Length:{length}</label>
    </div>
    <div>
      <input
      type='checkbox'
      defaultChecked={numberAllow}
      if="numberinput"
      onChange={()=>{setNumberAllow((prev)=>!prev)}}

      />
      <label className='text-orange-300' 
      htmlFor='numberinput'>Number</label>
    </div>
    <div>
      <input
      type='checkbox'
      defaultChecked={charAllow}
      if="charinput"
      onChange={()=>{setCharAllow((prev)=>!prev)}}
      />
      <label
      className='text-orange-300'
       htmlFor='charinput'
       >Character</label>
    </div>

   </div>
   </div>
    </>
  )
}

export default App
