import React, { useState } from "react";
import "../Css/all.css";
import Right from "./Right";
import Login from "./Login";
import Left from "./Left";
import Profile from "./Profile";
import Colorpicker from "./colorpicker/Colorpicker";
const Main = () => {
  const [text, settext] = useState("");
  const [val, setval] = useState(false);

  const sethead = (text) => {
    settext(text);
  };
  const islogin = (a) => {
    setval(a);
  };
  return (
    <div className="main">
    <Colorpicker/>
      {val ? (
        <Profile islogin={islogin}/>
      ) : (
        <>
          <Left text={text} islogin={islogin} />
          <Right sethead={sethead} />
        </>
      )}
    </div>
  );
};

export default Main;
