
import './App.css';
import React from 'react';
import Home from "./components/Home";
// import Header from "./components/Header";
// import Header from "./components/Header";
import Header from "./components/Header";
import { HashRouter as Router,Route, Routes} from "react-router-dom";
// import Profile from './components/ProfilePage';
import Loginpage from './components/Loginpage';
import Register from './components/Register';
import Acounts from './components/Acounts';
// import MyAccommodation from './components/MyAccommodation';
// import MyBookings from './components/BookingPage';
// import ProfilePage from './components/ProfilePage';
import axios from 'axios';
import {UserContextProvider } from './UserContext'
// import { HashRouter as Router, Routes, Route } from "react-router-dom";
// axios.defaults.baseURL="https://localhost:4000";
axios.defaults.withCredentials=true;

function App() {
  
  return (

    
    <UserContextProvider>
<>
    <Router>
      {/* <div className="container"> */}
      <Header/>

  <Routes>

    {/* <Route path="/profile" component={Profile} />
     */}
     
     <Route  exact path='/' element={<Home />} />
     {/* <Route exact path="/profile" element={<Profile />} /> */}
     <Route exact path="/loginpage" element={<Loginpage />} />
     <Route exact path="/register" element={<Register/>} />
     <Route exact path="/acounts/:subpage?" element={<Acounts/>} />
     <Route exact path="/acounts/:subpage/:action" element={<Acounts/>} />
     {/* <Route exact path="/acounts/myBookings" element={<MyBookings/>} />
     <Route exact path="/acounts/myAccommodation" element={<MyAccommodation/>} /> */}
    
  </Routes>
     {/* </div> */}

    {/* <Header/> */}

    </Router>
</>
     </UserContextProvider>
    
  );
}

export default App;
