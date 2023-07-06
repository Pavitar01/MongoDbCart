import React,{ useState } from 'react'


const Forget = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");

    const changePass=()=>{
        let alluser=JSON.parse(localStorage.getItem("User"))
        const user = alluser.find((user) => user.email === email);
        if(user){
             let curremail=user.email;
             if(curremail===email) {
                console.log(curremail)
             }
        }
    }
  return (
    <div className='mainforget'>
      <h1>Reset Pasword</h1>
      <input type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
      <input type='password' placeholder='new password' onChange={(e)=>{setPass(e.target.value)}}/>
      <input type='text' placeholder='Retype password' onChange={(e)=>{setCpass(e.target.value)}}/>
      <button className='btn' style={{width:"180px",height:"25px",fontSize:"12px"}} onClick={changePass}>Change Password</button>
    </div>
  )
}

export default Forget
