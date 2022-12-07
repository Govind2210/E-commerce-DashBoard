import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // if user in the signup page should not seen
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  // login function
  const loginClick = async () => {
    console.log(email, password);
    let result = await fetch("https://e-comm-backendbygovind.herokuapp.com/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      },
    });

    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token" , JSON.stringify(result.auth))
      navigate("/");
    } else {
      alert("Please Enter Right Email or Right Password");
    }
  };

  return (
    <div className="login">
      <h1>login</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
        placeholder="Enter Email"
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="inputBox"
        placeholder="Enter Password"
      />
      <button className="appButton" onClick={loginClick} type="button">
        Login
      </button>
    </div>
  );
}

export default Login;
