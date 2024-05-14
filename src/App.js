import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn, MDBIcon, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';
import test from "./test.js"
import Register from './components/register.jsx';
import Userlist from './components/userlist.jsx';
import UserPage from './components/userpage.jsx';
import Login from './components/login.jsx';
import Forum from './components/Forum.jsx';
import SinglePost from './components/singlepost.jsx';
import Me from './components/Me.jsx';
import CreatePost from './components/createpost.jsx';
import ModifyInfo from './components/modifyinfo.jsx';
import CreateComment from './components/createcomment.jsx';

const Home = () => (
 

  <div  className='center'>
    <Card style={{ width: '18rem' }}>
    <Card.Title >WELCOME TO STRIVEBLOG</Card.Title>
    <Card.Img variant="top" src="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90ZWJvb2slMjBwZW58ZW58MHx8MHx8fDA%3D/100px180" />
    <Card.Body>
    
      <Card.Text>
      This blog can only be browsed by authenticated users, so please
      </Card.Text>
      <Card.Text>
      <Link to="/login">Sign In</Link>
    
      <p className='p-4'>OR</p>
      <Button variant="danger">Create a new account</Button>
      </Card.Text>
      
    </Card.Body>
    </Card>
  </div>
);

const Categories = () => (
  <div>
    <h2>Categories</h2>
    <p>Browse items by category.</p>
  </div>
);

const Products = () => (
  <div>
    <h2>Products</h2>
    <p>Browse individual products.</p>
  </div>
);



export default function App() {
  const [navigatePath, setNavigatePath] = useState();
  function handleNavigation(navPath)
  {
    let prev = navigatePath;
    setNavigatePath(navPath)
  }

  const [auth,setAuth] = useState(false);

  return (
    
    <div>
    <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
        </ul>
    </nav>

    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {localStorage.getItem("token") && <Route path="/categories" element={<Categories />} />}
        {localStorage.getItem("token") && <Route path="/userlist" element={<Userlist />} />}
        {localStorage.getItem("token") && <Route path="/userlist/me" element={<UserPage />} />}      
        {localStorage.getItem("token") && <Route path="/forum" element={<Forum />} />}
        {localStorage.getItem("token") && <Route path="/post/newComment" element={<CreateComment/>} />}
        {localStorage.getItem("token") && <Route path="/postDetails/:id" element={<SinglePost />} /> }
        {localStorage.getItem("token") && <Route path="/me/" element={<Me />} /> }
        {localStorage.getItem("token") && <Route path="/me/create" element={<CreatePost />} /> }
        {localStorage.getItem("token") && <Route path="/me/modify" element={<ModifyInfo />} /> }
      </Routes>
    </div>
  );
}