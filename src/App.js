import './App.css';
import {React, useState} from 'react'
import Letters from './Letters/Letters'

function App() {
  const [myInput, setmyInput] = useState('')
  
  const handle =(e)=>{
    setmyInput(
      e.target.value
    )
  }

  const delet=(i)=>{
    console.log(i)
    setmyInput(myInput.split('').filter((a,b)=>b!==i).join(''));

  }

  return (
    <div className="App">

<input value={myInput} 
type='text'
placeholder='add your word'
onChange={handle}/>
<div>
  <div>
    Text length: {myInput.length}
    <p style={{color:myInput.length<=10? 'red':"white"}}>{myInput.length<=10&&myInput.length!=0? 'Text too short': myInput.length==0? '':'Text is enough'}</p>
  </div><br></br>

{
  myInput.split('').map((a, index)=>(
<Letters click={()=>delet(index)} color={myInput.length<=10? 'red':"white"} herf={a} key={index}/>

  ))
}
</div>

    </div>
  );
}

export default App;
