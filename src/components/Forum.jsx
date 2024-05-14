import React, {useEffect, useState} from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import "./userlist.css"
import "./Forum.css";
import Table from 'react-bootstrap/Table';
import UserPage from './userpage';
import SinglePost from './singlepost';
import { Container, Row, Col } from 'react-bootstrap';
  
  
export default function Forum() {

    const [postList, setPostList] = useState(0);
    const token = localStorage.getItem("token");
    function handlePostList(x)
    {
        setPostList(x);
    }

    async function getPostList()
    {
        await fetch("http://localhost:3000/posts", {
            method: "GET",      
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            },
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {     
            handlePostList(data);
        })

        .catch((err) => console.log("problem: ", err))
    }

    if(postList == 0)
       getPostList();

    const [userList, setUserList] = useState(0);
    
    function handleUserList(x)
    {
        setUserList(x);
    }
    
    async function getUserList()
    {

        await fetch("http://localhost:3000/users", {
            method: "GET",      
            headers: { 
            "Content-type": "application/json; charset=UTF-8",   
     //       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF3aXdpOTQiLCJlbWFpbCI6ImF3b3dvQHBvdG9saW5vLmNvbSIsImlhdCI6MTcxNTU0OTM5MiwiZXhwIjoxNzE1NjM1NzkyfQ.bLNWPzujdFB93RLgYRLiolsDkhVNsZr_-3i6NsgNf1s"
            },
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {     
            handleUserList(data);
        })

        .catch((err) => console.log("problem: ", err))
    }

    if(userList == 0)
        getUserList();

  return (
    <>

     <Container>
     <Row className='post-list' > 
        Striveblog's post list
     </Row>
      <Row>
        <Col className='row-css'>Title</Col>
        <Col className='row-css'>Author</Col>
      </Row>
      <Row>
      {postList && postList.map((p) =>   
        <Col className='col-color'>      
        <Link className='col-text' to={{ 
            pathname: ("/postDetails/" + p._id ), 
            }}>
            {p.title} 
        </Link>   
        </Col>
      )}
       {(postList && userList) && postList.map((p) => 
          <Col className='col-color'> 
            {userList.map((u) => u._id == p.author && <span className='col-text'>{u.username}</span>)}
          </Col>
       )}
      </Row>
    </Container>

    </>
  )
}
