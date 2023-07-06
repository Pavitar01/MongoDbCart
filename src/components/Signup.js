import React, { useEffect, useState } from "react";
import userimg from "../assets/user.png";
import { v4 as uuidv4 } from "uuid"; //for unique id

import bcrypt from "bcryptjs"; //for encrytion
import axios from "axios";

const Signup = () => {
  const admin = "admin";
  const vendor = "vendor";
  const customer = "customer";

  const [images, setimage] = useState(userimg);
  const [imagename, setimagename] = useState("Upload image");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");
  const [err, seterr] = useState("");
  const [role, setrole] = useState("customer");
  const [alluser, setalluser] = useState([]);
  const [islogin, setIsLogin] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem("User");
    if (userString) {
      const parsedUsers = JSON.parse(userString);
      setalluser([...parsedUsers]);
    }
  }, []);

  const updateUserLocalStorage = (user) => {
    localStorage.setItem("User", JSON.stringify(user));
  };

  const isEmailValid = (email) => {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isEmailTaken = (email) => {
    return alluser.some((user) => user.email === email);
  };

  const setprofile = (e) => {
    if (e.target.files[0]) {
      setimage(URL.createObjectURL(e.target.files[0]));
      setimagename(e.target.files[0].name);
    }
  };
  const signupto = async () => {
    if (
      lname === "" ||
      fname === "" ||
      email === "" ||
      cpass === "" ||
      pass === ""
    ) {
      seterr("Please provide all the required details");
      setIsLogin(false);
    } else if (!isEmailValid(email)) {
      seterr("Please enter a valid email address");
      setIsLogin(false);
    } else if (isEmailTaken(email)) {
      seterr("This email address is already registered");
      setIsLogin(false);
    } else if (cpass !== pass) {
      seterr("Both passwords should be the same");
      setIsLogin(false);
    } else {
      try {
        //salt has more better encrytion
        // bcrypt.genSalt generates a salt value to increase the security of
        // the hash, and bcrypt.hash creates the hash from the password and the salt.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);

        const newUser = {
          id: uuidv4(),
          profile: images,
          name: fname + " " + lname,
          email: email,
          password: hashedPassword, // Store the hashed password
          role: role,
        };

        setalluser((prevUser) => {
          const updatedUser = [...prevUser, newUser];
          updateUserLocalStorage(updatedUser);
          return updatedUser;
        });

        setlname("");
        setfname("");
        setemail("");
        setpass("");
        setcpass("");
        setimage(userimg);
        seterr("");
        setrole("");
        setimagename("Upload image");
        setIsLogin(true); // Set islogin to true
        const err=await axios.post("http://localhost:8000/user", {
          email: email,
          role: role,
          image: images,
          name: fname + lname,
        });
        seterr(err.data)
      } catch (error) {
        alert(error);
      }
    }
  };
  // console.log(alluser);
  return (
    <div className="signup">
      <div className="head">
        <h1 className="head1">Signup</h1>
      </div>

      <div className="image">
        <input
          type="file"
          id="file"
          className="profile"
          accept="image/*"
          onChange={setprofile}
        />
        <label htmlFor="file">
          <img src={images} alt="User" className="userimg" />
          <p className="usertext">{imagename}</p>
        </label>
      </div>
      <div
        className="input"
        style={{
          padding: "20px",
          boxSizing: "border-box",
          marginTop: "-20px",
        }}
      >
        <div className="top">
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => {
              setfname(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => {
              setlname(e.target.value);
            }}
          />
        </div>
        <div className="middle">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>
        <div className="top">
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => {
              setpass(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Retype Password"
            value={cpass}
            onChange={(e) => {
              setcpass(e.target.value);
            }}
          />
        </div>
        <div className="bottom">
          <input
            type="radio"
            name="role"
            value={admin}
            onChange={(e) => {
              setrole(e.target.value);
            }}
          />
          <label>Admin</label>
          <input
            type="radio"
            name="role"
            value={vendor}
            onChange={(e) => {
              setrole(e.target.value);
            }}
          />
          <label>Vendor</label>
          <input
            type="radio"
            name="role"
            value={customer}
            onChange={(e) => {
              setrole(e.target.value);
            }}
          />
          <label>Customer</label>
        </div>
        <p
          style={{
            color: islogin ? "green" : "red",
            height: "10px",
            marginLeft: "25px",
            fontSize: "12px",
          }}
        >
          {err}
        </p>
        <div className="button" style={{ marginTop: "30px" }}>
          <button
            className="btn"
            onClick={signupto}
            style={{ marginTop: "-10px" }}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
