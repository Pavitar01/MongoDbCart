import React from "react";

const Success = ({ val }) => {
  console.log(val);
  return (
    <div style={{ width: "200px", height: "300px", borderRadius: "20px" }}>
      <h1 style={{ fontSize: "30px", color: "green", textAlign: "center" }}>
        Congratulation <span>You have Bought</span>
      </h1>
      <div style={{width:"100%"}}>
        <img src={val.Image}  style={{width:"100%"}}/>
        <p> {val.price}</p>
      </div>
    </div>
  );
};

export default Success;
