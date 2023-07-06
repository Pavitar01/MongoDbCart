import React, { useState, useEffect } from "react";
import fb from "../assets/fb.png";
import instagram from "../assets/instagram.png";
import google from "../assets/google.png";
import bcrypt from "bcryptjs";
import Forget from "./Forget";
import axios from "axios";

const Login = ({ setdetails, islogin }) => {
  const arr = [fb, google, instagram];
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [err, seterr] = useState("");
  const [forgot, setforgot] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      islogin(true);
    }

  }, [islogin]);

  //forget pass
  const forget = () => {
    forgot ? setforgot(false) : setforgot(true);
  };

  const loginto = () => {
    const userString = localStorage.getItem("User");
    if (!userString) {
      seterr("There is no user data.");
      return;
    }

    const allusers = JSON.parse(userString);
    console.log(allusers);
    if (email === "" || password === "") {
      seterr("Please fill in all the credentials.");
      islogin(false);
    } else if (allusers) {
      const user = allusers.find((user) => user.email === email);
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.error(err);
            seterr("An error occurred while logging in");
            islogin(false);
            return;
          }

          if (result) {
            seterr("Login successful.");


            localStorage.setItem("loggedInEmail", email);
            islogin(true);
            localStorage.setItem("loggedIn", "true");
          } else {
            seterr("Incorrect email or password.");
            islogin(false);
            localStorage.setItem("loggedIn", "false");
          }
        });
      } else {
        seterr("Incorrect email or password.");
        islogin(false);
        localStorage.setItem("loggedIn", "false");
      }
      setdetails(email, password);
    } else {
      seterr("There is no user data.");
    }
  };
  return (
    <div className="loginmain">
      <div className="head">
        <h1 className="head1">Login</h1>
      </div>
      <div className="other">
        {arr.map((i, index) => (
          <li key={index}>
            <img src={i} alt={`Social Media ${index}`} />
          </li>
        ))}
      </div>
      <p className="text">- or use your email -</p>
      <div className="input">
        <label className="label">Email</label>
        <input
          type="text"
          className="feild"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <label className="label">Password</label>
        <input
          type="password"
          className="feild"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <div className="forget">
          <p onClick={forget}>
            <a href="#">Forget your password?</a>
          </p>
        </div>

        {forgot && <Forget />}

        <p
          style={{
            margin: "-10px 0 0 50px",
            width: "100%",
            color: islogin ? "green" : "red",
            fontSize: "15px",
          }}
        >
          {err}
        </p>
        <div className="button">
          <button className="btn" onClick={loginto}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
