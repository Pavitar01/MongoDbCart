import React, { useState } from "react";

const Right = ({sethead}) => {
  const [val, setval] = useState(true);
 
const login=()=>{
    setval(false)
    sethead(val)
}
const signup=()=>{
    setval(true)
    sethead(val)
}

  return (
    <div className="toggle">
      {val? (
        <h1 className="togglehead">Don't have an Account ?</h1>
      ) : (
        <h1 className="togglehead" style={{fontSize:"45px"}}>HI, Welcome</h1>
      )}
      {val? (
        <button className="togglebutton" onClick={login}>Signup</button>
      ) : (
        <button className="togglebutton" onClick={signup}>Login</button>
      )}
    </div>
  );
};

export default Right;
