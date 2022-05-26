import React from "react";
import { Routes, BrowserRouter as Router,Route } from "react-router-dom";
import '../../App.css'
import Header from "../Header";
import Landing from "../Landing";
import Welcome from "../Welcome";
import Login from "../Login";
import Signup from "../Signup";
import ErrorPage from "../ErrorPage";
import Footer from "../Footer";
import ForgetPassword from "../ForgetPassword";
import {IconContext} from 'react-icons'

/**
 * Si vous utilisez react-router-dom v6, il semble que « Switch » ait été remplacé par « Routes »
 * Dans react-router-dom v6, "Switch" est remplacé par les routes "Routes". Vous devez mettre à jour l'importation de
 * import { Switch, Route } from "react-router-dom";
 * 
 * à
 * 
 * import { Routes ,Route } from 'react-router-dom';
 * 
 * Vous devez également mettre à jour la déclaration de route à partir de
 * <Route path="/" component={Home} />
 * 
 * à
 * 
 * <Route path='/welcome' element={<Home/>} />
 * 
 * Dans react-router-dom, vous n'avez pas non plus besoin d'utiliser exact dans la déclaration de route.
 * 
 * Je désinstalle donc la version 6 de react-router-dom

npm uninstall react-router-dom


Et installé la version 5.2.0 de react-router-dom

npm install react-router-dom@5.2.0

change from this 

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


        <Switch>
              <Route path="/home" component={Home} />
          </Switch>
            
            
          to   
            
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


         <Routes>
              <Route path="/home" element={ <Home />} />
            </Routes>




            Ceci est un exemple utilisant react-router-dom V6

import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import '../styles/global.css'

import Layout from '../containers/Layout'
import Home from '../pages/Home'
import Login from '../containers/Login'
import RecoveryPassword from '../containers/RecoveryPassword'
import NotFound from '../pages/NotFound'

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/recovery-password" element={<RecoveryPassword/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
 */

function App() {    
  return (
  <Router>
    <IconContext.Provider value={{style:{verticalAlign:'middle'}}}>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
      <Footer/>
    </IconContext.Provider>
    {/*<Switch>
      <Route path="/home" component={Landing} />
      <Route path="/home" component={Welcome} />
      <Route path="/home" component={Home} />
      <Route path="/home" component={Home} />
    </Switch>*/}

    
  </Router>
  );
}

export default App;
