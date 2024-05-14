import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn, MDBIcon, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function ModifyInfo() {

    const uID = localStorage.getItem("uID");
    const username = localStorage.getItem("username");
    const name = localStorage.getItem("name");
    const surname = localStorage.getItem("surname");
    const email = localStorage.getItem("email");
    const pfp = localStorage.getItem("pfp");
    const dob = localStorage.getItem("dob");
    const pass = localStorage.getItem("password");
    let navigate = useNavigate();

    async function submitChanges() {
    
        const newMail = document.getElementById("changemail").value;
        const newUser = document.getElementById("changeuser").value;
        const newFirstName = document.getElementById("changename").value;
        const newLastName = document.getElementById("changesurname").value;
        const newmail = document.getElementById("changemail").value;
        const newPFP = document.getElementById("changeurl").value;

        const body = {
            "username": newUser ? newUser : username,
            "email": newMail ? newMail :email,
            "name": newFirstName ? newFirstName : name,
            "surname": newLastName ? newLastName : surname,
            "dob": dob,
            "pfp": pfp,
            "password": pass 
          }
        const URL = "http://localhost:3000/users/" + uID
        await fetch(URL, {
          method: "PUT",      
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
          alert("successfully modified info");            
          localStorage.setItem("token", data.token);
          localStorage.setItem("username",  data.username);
          localStorage.setItem("name",  data.name);
          localStorage.setItem("surname",  data.surname);
          localStorage.setItem("email",  data.email);
          localStorage.setItem("pfp",  data.pfp);
          navigate("/me");
        })
    }
    
    return (
        <MDBContainer fluid>
        <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
    
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Edit profile info</p>

    
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg'/>
                  <MDBInput label='First name' id='changeuser' type='text' placeholder={username}/>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg'/>
                  <MDBInput label='Email' id='changemail' type='email' placeholder={email}/>
                </div>
    
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg'/>
                  <MDBInput label='First name' id='changename' type='text' placeholder={name}/>
                </div>
    
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg'/>
                  <MDBInput label='Last name' id='changesurname' type='text' placeholder={surname}/>
                </div>
            
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg'/>
                  <MDBInput label='URL of profile image' id='changeurl' type='text' placeholder={pfp}/>
                </div>
    
                <div className='mb-4'>
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                </div>
    
                <MDBBtn className='mb-4' size='lg' onClick={submitChanges}>Confirm changes</MDBBtn>
    
              </MDBCol>
    
              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
              </MDBCol>
    
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
    
        </MDBContainer>
      );
}
