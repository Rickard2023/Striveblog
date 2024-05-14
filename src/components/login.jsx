import React from 'react'
import { useNavigate} from 'react-router-dom';
//import jsonwebtoken from "jsonwebtoken";
import { useContext } from 'react';

export default function Login() {

  let navigate = useNavigate();
  async function authenticateUser(e)
  {
    let emailData = document.getElementById("login-mail");
    let passwordData = document.getElementById("login-pwd");
    if(emailData && passwordData) {
        const email = emailData.value;
        const password = passwordData.value.toString();
        const body = {
          "username": 0,
          "email": email,
          "name": 0,
          "surname": 0,
          "dob": 0,
          "pfp": 0,
          "password": password 
        }

        await fetch("http://localhost:3000/users/login", {
          method: "POST",      
          headers: { 
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF3aXdpOTQiLCJlbWFpbCI6ImF3b3dvQHBvdG9saW5vLmNvbSIsImlhdCI6MTcxNTU0OTM5MiwiZXhwIjoxNzE1NjM1NzkyfQ.bLNWPzujdFB93RLgYRLiolsDkhVNsZr_-3i6NsgNf1s"  
          },
          body: JSON.stringify(body)
        })
        .then(resp => {
          return resp.json()
        })
        .then(data => {     
          alert("successfully logged in as " + data.username);   
          
          localStorage.setItem("token", data.token);
          localStorage.setItem("username",  data.username);
          localStorage.setItem("name",  data.name);
          localStorage.setItem("surname",  data.surname);
          localStorage.setItem("email",  data.email);
          localStorage.setItem("pfp",  data.pfp);
          localStorage.setItem("uID",data._id);
          localStorage.setItem("dob", data.dob);
          localStorage.setItem("password", data.password);
          navigate("/home");
        })
        .catch((err) => alert("problem: wrong email or password"));
    }     
  }

  return (
    <div className="Auth-form-container">
    <form className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Sign In</h3>
        <div className="form-group mt-3">
          <label >Email address</label>
          <input
          id="login-mail"
          type="email"
          className="form-control mt-1"
          placeholder="Enter email"
          />
      </div>
      <div className="form-group mt-3">
        <label>Password</label>
        <input
          id="login-pwd"
          type="password"
          className="form-control mt-1"
          placeholder="Enter password"
        />
      </div>
      <div className="d-grid gap-2 mt-3">
        <button type="button" onClick={authenticateUser} className="btn btn-warning">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right mt-2">
        Forgot <a href="#">password?</a>
      </p>
    </div>
  </form>

</div>


  )
}
