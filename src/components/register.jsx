import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn, MDBIcon, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';

async function createNewUser(e) {
 
  let nameplace = document.getElementById("form1");
 

  const info = [];
  let c = 0;
  for(let i = 0; i < 8; i++)
  {
      let field = document.getElementById("form"+i);
      if(field){
          info[c] = field.value;
          c++;
      }
  }

  const body = {
      "username": info[0],
      "email": info[1],
      "name": info[2],
      "surname": info[3],
      "dob": info[4],
      "pfp": info[5],
      "password": info[6]      
  }

  await fetch("http://localhost:3000/users", {
      method: "POST",      
      headers: { 
      "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body)
  })
   .then(resp => {
       return resp.json()
   })
   .then(data => {     
      alert("thank you " + data.name + " for your registration");  
  })
  .catch((err) => console.log("problem: ", err));
}

export default function Register() {
  return (
    <MDBContainer fluid>
    <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
      <MDBCardBody>
        <MDBRow>
          <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

            <div className="d-flex flex-row align-items-center mb-4 ">
              <MDBIcon fas icon="user me-3" size='lg'/>
              <MDBInput label='Username' id='form0' type='text' className='w-100'/>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="envelope me-3" size='lg'/>
              <MDBInput label='Email' id='form1' type='email'/>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="lock me-3" size='lg'/>
              <MDBInput label='First name' id='form2' type='text'/>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="lock me-3" size='lg'/>
              <MDBInput label='Last name' id='form3' type='text'/>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="lock me-3" size='lg'/>
              <MDBInput label='Date of Birth' id='form4' type='date'/>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="lock me-3" size='lg'/>
              <MDBInput label='URL of profile image' id='form5' type='text'/>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="key me-3" size='lg'/>
              <MDBInput label='Password' id='form6' type='password'/>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="key me-3" size='lg'/>
              <MDBInput label='Repeat your password' id='form7' type='password'/>
            </div>

            <div className='mb-4'>
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
            </div>

            <MDBBtn className='mb-4' size='lg' onClick={createNewUser}>Register</MDBBtn>

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
