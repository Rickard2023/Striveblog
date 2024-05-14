import {React} from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Card, Button} from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function SinglePost({props}) {


    const [commentList, setCommentList] = useState(0);
    const [userList, setUserList] = useState(0);

    const appURL = "http://localhost:3000";
    // GET VIEWED POST
    const {id} = useParams();
    const [post, setPost] = useState(0); 
    function handlePost(x)
    {
        setPost(x);
    }
    async function getViewedPost()
    {
        await fetch(appURL +"/posts/" + id, {
            method: "GET",      
            headers: { 
            "Content-type": "application/json; charset=UTF-8",   
        //  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF3aXdpOTQiLCJlbWFpbCI6ImF3b3dvQHBvdG9saW5vLmNvbSIsImlhdCI6MTcxNTU0OTM5MiwiZXhwIjoxNzE1NjM1NzkyfQ.bLNWPzujdFB93RLgYRLiolsDkhVNsZr_-3i6NsgNf1s"
            },
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {              
            handlePost(data);
        })

        .catch((err) => console.log("problem: ", err))
    }

    if(post == 0 || post._id != id)
        getViewedPost();

    ///////////////////////////////////////////////////////////

    // GET SINGLE USER
    const authorID = post.author;
    const userURL = (appURL + "/users/" + authorID);

    const [user, setUser] = useState(0);
    function handleUser(x)
    {
        setUser(x);
    }
    async function getUser()
    {
        await fetch(userURL, {
            method: "GET",      
            headers: { 
            "Content-type": "application/json; charset=UTF-8"   
     //     "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF3aXdpOTQiLCJlbWFpbCI6ImF3b3dvQHBvdG9saW5vLmNvbSIsImlhdCI6MTcxNTU0OTM5MiwiZXhwIjoxNzE1NjM1NzkyfQ.bLNWPzujdFB93RLgYRLiolsDkhVNsZr_-3i6NsgNf1s"
            },
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {     
            handleUser(data);            
        })

        .catch((err) => console.log("problem: ", err))
    }
    if(user == 0)
        getUser();

    if(user === undefined || user === null){
       return;
    }


     ///////////////////////////////////////////////////////////

     // GET COMMENTS
     
     if(post && post._id !== undefined && post._id !== null){
       
        const commURL = "http://localhost:3000/posts/comments/"+ post._id;
   
        function handleCommentList(c)
        {
           setCommentList(c);
        }
        async function getCommentList()
        {
    
            await fetch(commURL , {
                method: "GET",      
                headers: { 
                "Content-type": "application/json; charset=UTF-8"   
       //        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF3aXdpOTQiLCJlbWFpbCI6ImF3b3dvQHBvdG9saW5vLmNvbSIsImlhdCI6MTcxNTU0OTM5MiwiZXhwIjoxNzE1NjM1NzkyfQ.bLNWPzujdFB93RLgYRLiolsDkhVNsZr_-3i6NsgNf1s"
                },
            })
            .then(resp => {
                return resp.json()
            })
            .then(data => {     
               handleCommentList(data);            
            })
    
            .catch((err) => console.log("problem: ", err))
        }
        if(commentList == 0)
           getCommentList();
     }


     ///////////////////////////////////////////////////////////

     // get all the users to fill the comment

    
    
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
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF3aXdpOTQiLCJlbWFpbCI6ImF3b3dvQHBvdG9saW5vLmNvbSIsImlhdCI6MTcxNTU0OTM5MiwiZXhwIjoxNzE1NjM1NzkyfQ.bLNWPzujdFB93RLgYRLiolsDkhVNsZr_-3i6NsgNf1s"
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

    if(commentList && userList){
        for(let c of commentList)
        {
            for(let u of userList)
            {
                if(c.user == u._id) {
                   c.user = u.username;
                }
            }
        }
    }
   

    console.log(post._id, user._id);
    return (
        <>
        {user && post &&
            <Card style={{ width: '18rem' }}>
               <Card.Body>
                 <Card.Title>{post.title}</Card.Title>
                 <Card.Text>
                   By {user.username}
                 </Card.Text>
                 <Card.Text>
                  {post.content}
                 </Card.Text>
                 <Button variant="warning">
                 <Link to="/post/newComment" state={{ 
                     postID: post._id,
                     userID: user._id
                    }}>
                    Comment
                </Link>

                 </Button>
               </Card.Body>
            </Card>          
        }
        {commentList && commentList.map((c) =>        
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                 
                  <Card.Text>
                    By {c.user}
                  </Card.Text>
                  <Card.Text>
                   {c.content}
                  </Card.Text>
                </Card.Body>
             </Card>
        )}
        </> 
    );
}
