
import React, {useState} from 'react';
import { Link} from 'react-router-dom';
import "./userlist.css"
import Table from 'react-bootstrap/Table';

function removeUser(x)
{

    async function handleDeletion(){
        await fetch("http://localhost:3000/users/" + x._id, {
            method: "DELETE",      
            headers: { 
            "Content-type": "application/json; charset=UTF-8", 
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF3aXdpOTQiLCJlbWFpbCI6ImF3b3dvQHBvdG9saW5vLmNvbSIsImlhdCI6MTcxNTU0OTM5MiwiZXhwIjoxNzE1NjM1NzkyfQ.bLNWPzujdFB93RLgYRLiolsDkhVNsZr_-3i6NsgNf1s"  
            },
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {     
            console.log("user " + x._id + " has been deleted");
        })
    
        .catch((err) => console.log("problem: ", err))
    }
    handleDeletion();
}

export default function Userlist() {

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
            "Content-type": "application/json; charset=UTF-8"
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

    let c = 0;
    return(
        <>
        <p className='list'>Striveblog's user list</p>
        <Table striped bordered hover>      
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email </th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>        
          {userList && userList.map((x) =>        
          <tbody>     
            <td className='tablebg'>{c++}</td>
            <td className='tablebg'>{x.username}</td>
            <td className='tablebg'>{x.email}</td>
            <td className='tablebg'>{x.name}</td>
            <td className='tablebg'>{x.surname}</td>      
            <button onClick={() => removeUser(x)}>DELETE USER</button> 
            <Link to="/userlist/me" state={{ 
                uID: x._id, 
                email: x.email,
                username: x.username,
                name: x.name,
                surname: x.surname
                }}>
                Next Step
            </Link>

          </tbody>       
          )}
        </Table>
        </>
    );
}
