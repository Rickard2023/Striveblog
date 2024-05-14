import React from 'react'
import { useLocation } from 'react-router-dom'


export default  function UserPage(e) {

  const location = useLocation()
  const { uID, username, name, surname, email } = location.state
 
  return (

    <>
    {uID &&
     <div>
     <p style={{color: "red"}}>{username}</p>
     <p>{name} {surname}</p>
     <p>{email}</p>
     </div>
    }
    </>
   
    
  );
}
