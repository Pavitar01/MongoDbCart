import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

const Left = ({text,islogin}) => {
  const [val, setval] = useState(true);


  const setdetails=(email,pass)=>{
    // console.log("i ma from the left js:"+email,pass)
  }
  return (
    <div>
      {
        text?<Signup/>:<Login setdetails={setdetails} islogin={islogin}/>
      }
    </div>
  )
}

export default Left
