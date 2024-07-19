import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navebar from '../components/Navebar';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "sameer.sc2@gmail.com", password: "sameer" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("click");
    console.log(JSON.stringify({ email: credentials.email }));

    axios.post('https://backend-b06f.onrender.com/api/loginuser', {
      email: credentials.email,
      password: credentials.password,
    })
      .then(function (response) {
        console.log(response);
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", response.data.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        const pass = err.response.data.errors[0].msg;
        const email = err.response.data.errors[0].msg;
        if (pass === "Incorrect Password") {
          console.log("enter valid password");
          alert("Enter Valid password");
        }
        if (email === "Invalid value") {
          console.log("enter valid email");
          alert("Enter Valid email");
        }
      });
  };

  const onChange = e => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <Navebar />
      </div>
      <div className='container'>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="m-0 btn btn-success" onClick={handleSubmit}> Login </button>
          <Link to="/createuser" className="m-3 btn btn-danger"> Sign Up </Link>
        </form>
      </div>
    </div>
  );
}
