import React, { useEffect, useState } from "react";

const About = ({ islogin }) => {
  const [fname, setFname] = useState("");
  const [logo, setLogo] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [toggle, settoggle] = useState(false);
  const [originalDetails, setOriginalDetails] = useState({});

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    const user = JSON.parse(localStorage.getItem("User"));
    if (user && user.length > 0) {
      const loggedInUser = user.find((user) => user.email === loggedInEmail);
      
      if (loggedInUser) {
        const { name, profile, role, email } = loggedInUser;
        setFname(name);
        setLogo(profile);
        setRole(role);
        setEmail(email);
        setOriginalDetails({ name, profile, role, email });
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.setItem("loggedIn", "false");
    islogin(false);
  };

  const handleChangeDetails = () => {
    settoggle(false)
    const updatedUser = {
      name: fname,
      profile: logo,
      role: role,
      email: email,
    };
    const allUsers = JSON.parse(localStorage.getItem("User"));
    if (allUsers && allUsers.length > 0) {
      const updatedUsers = allUsers.map((user) =>
        user.email === email ? updatedUser : user
      );
      localStorage.setItem("User", JSON.stringify(updatedUsers));
    }
  };

  const handleDiscardChanges = () => {
    settoggle(false)
    setFname(originalDetails.name);
    setLogo(originalDetails.profile);
    setRole(originalDetails.role);
    setEmail(originalDetails.email);
  };

  return (
    <div className="about">
      <div className="aboutlogo">
        <img src={logo} alt="Profile" />
      </div>
      <h1>{fname}</h1>
      <p>Role: {role}</p>
      <p>{email}</p>
      <button
        className="btn"
        style={{ width: "100px", height: "30px", margin: "0 0 0 85px" }}
        onClick={() => {
          toggle ? settoggle(false) : settoggle(true);
        }}
      >
        {
          toggle ? "Back":"Update"
        }
      </button>
      {toggle && (
        <div className="input-fields">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setFname(e.target.value)}
          />

          <input
            placeholder="Image url"
            type="text"
            onChange={(e) => setLogo(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleChangeDetails}>Save Changes</button>
          <button onClick={handleDiscardChanges}>Discard Changes</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default About;
