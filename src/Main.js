import React from 'react';
import './index.css';
import Login from './Login';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from './Nav.js';
import Contact from './Contact';
import {Switch,Route } from "react-router-dom";
import About from './About';
import Profile from './Profile';
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from 'history';


function Main (props)
{
 // const history = useHistory();
  const history = createBrowserHistory({ forceRefresh: true });

  const handleLogout = () => {

    sessionStorage.setItem('user', '');
    history.push('/login');
  }


return(



<div  style={{'background-color':'white !important;'}}>

 <h3 style={{'margin-left':'18%'}} class="display-5" >

   <img src="https://i.imgur.com/CXQmsmF.png" class="logo"/>House Hold management</h3>
   <hr/>

     <div class="container"><br/>
      <Nav logout={handleLogout} />
     <br/>
     <Switch>
         <Route exact path="/" component={App} />
         <Route exact path="/About" component={About} />
         <Route exact path="/Contact" component={Contact} />
         <Route exact path="/Profile" component={Profile} />
         <Route path="/Login" component={Login} />

     </Switch>

     </div>


     </div>
);
}

export default Main;