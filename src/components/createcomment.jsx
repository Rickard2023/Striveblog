import React from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

export default function CreateComment() {

//    const {postID, userID} = useLocation().state;
    let navigate = useNavigate();
    const postID = "66428ff0ad95065670961b9f" 
    const userID = "663fb3bd76e8a63b374f37fd"
    const URL = ("http://localhost:3000//posts/comments/"+postID+"/"+userID)
    console.log(postID,userID, URL);
    
    
    function getContent() {
        let textArea = document.getElementById("comment-content");
        return textArea.value;
    }
    
    


    async function postNewComment()
    {
        
        const body = {
            "user": userID,
            "post": postID,
            "content": document.getElementById("comment-content").value
        }
    
        let content = getContent();
        console.log(content);
        
       
        await fetch(URL, {
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
          alert("successfully created Comment");      
          console.log(data);      
        })

    }

    return (
    <Form>  
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label id="comment-content">Text</Form.Label>
        <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <button onClick={postNewComment} className='btn btn-success'>Post</button>
    </Form>
    );
}
