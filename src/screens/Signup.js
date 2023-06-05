import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function Signup() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

  //const header = {"Access-Control-Allow-Origin": "*" };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clik");
    console.log(JSON.stringify({ password: credentials.password }))

    axios.post('http://localhost:5000/api/createuser', {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      location: credentials.geolocation,
      

    })


      .then(function (response) {
       console.log(response)
       alert("Success")
     
      
      })

      .catch((err) => {
        console.log(err);
        const pass=err.response.data.errors[0].msg;
        const email = err.response.data.errors[0].msg
        //console.log(err.response.data.errors[0].msg);
        if(pass==="Incorrect Passward")
        {
          console.log("enter vaild passward")
          alert("Enter Valid passward")
        }
        if(email === "Invalid value")
        {
          console.log("enter vaild email")
          alert("Enter Valid email")
        }
     });
    
  }


  const onChange = e => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
   console.log({ ...credentials, [e.target.name]: e.target.value })
  }

  return (

    <>

      <div className='container'>
        <form >
          <div className="mb-3">
            <label for="name" className="form-label">Name</label>
            <input type="Text" className="form-control" name='name' value={credentials.name}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>


          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Address</label>
            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassword1" />
          </div>

          <button type="submit" className="m-0 btn btn-success"  onClick={handleSubmit} >Submit</button>

          <Link to="/login" className="m-3  btn btn-danger">Already an user user</Link>
        </form>
      </div>



    </>
  )
}
