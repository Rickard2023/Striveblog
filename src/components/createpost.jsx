import React from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {

    let navigate = useNavigate();


   
    const uID = localStorage.getItem("uID");
    const URL = ("http://localhost:3000/posts/" + uID)


    async function postNewTopic()
    { 
      
      const content = document.getElementById("content");
      const title = document.getElementById("title");
          const body = {
            "title": title,
            "content": content,
            "author": uID
        }
        console.log(body);
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
          alert("successfully created Post");      
          console.log(data);      
        })

    }

    return (
    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label id="title">Title</Form.Label>
        <Form.Control type="textarea" placeholder="title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label id="content">Text</Form.Label>
        <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <button onClick={postNewTopic} className='btn btn-success'>Post</button>
    </Form>
    );
}
