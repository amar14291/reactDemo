import {React,useState } from 'react';
import { NavLink } from 'react-router-dom';


function Navbar (props) {
let name = sessionStorage.getItem('user');
let [nameUser] = useState(0);
nameUser = name;
return (
<div>


<nav  className="navbar navbar-expand-lg navbar-light bg-blue">


  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul style={{marginLeft:'35% !important;'}} className="navbar-nav mr-auto">

      <li className="nav-item">

        <NavLink style={{color:'white'}} className="nav-link" to='/' ><span style={{color:'white !important'}} >Home</span></NavLink>

      </li>

      <li className="nav-item ">
        <NavLink style={{color:'white'}} className="nav-link" to='/About' ><span style={{color:'white !important;'}} >About</span></NavLink>
      </li>

      <li className="nav-item ">
        <NavLink style={{color:'white'}} className="nav-link" to='/Contact'><span style={{color:'white !important;'}} >Contact</span></NavLink>
      </li>

      <li className="nav-item ">
      <NavLink style={{color:'white'}} className="nav-link" to='/Profile'><span style={{color:'white !important;'}} >Profile</span></NavLink>
        {/* <a class="nav-link" href="#">My Profile<span class="sr-only">(current)</span></a> */}
      </li>


    </ul>
    <span> Hello {nameUser} ! </span>
     <span>&nbsp;</span>
    <input style={{width:'8%'}} type="button" onClick= {props.logout}  value="Logout" />


  </div>
</nav>


</div>

);
}


export default Navbar;