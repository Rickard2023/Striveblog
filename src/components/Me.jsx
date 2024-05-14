import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

export default function Me() {

  const username = localStorage.getItem("username");
  const name = localStorage.getItem("name");
  const surname = localStorage.getItem("surname");
  const email = localStorage.getItem("email");
  const pfp = localStorage.getItem("pfp");
  console.log({username,name,surname,email});

  return (
    <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '180px', borderRadius: '10px' }}
                      src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{username}</MDBCardTitle>
                    <MDBCardText>Proud Striveblogger</MDBCardText>

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Articles</p>
                        <p className="mb-0">41</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Followers</p>
                        <p className="mb-0">976</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Rating</p>
                        <p className="mb-0">8.5</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <MDBBtn className="flex-grow-1 btn-warning">
                      <Link to="/me/create" state={{ 
                        email: email,
                        username: username,
                        name: name,
                        surname: surname,
                        pfp: pfp
                        }}>
                        Create New Post
                        </Link>   
                        </MDBBtn>
                      <MDBBtn className="flex-grow-1 btn-warning">
                       <Link to="/me/modify" state={{ 
                        email: email,
                        username: username,
                        name: name,
                        surname: surname,
                        pfp: pfp
                        }}>
                        Modify Info
                        </Link>            
                      </MDBBtn>                
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
