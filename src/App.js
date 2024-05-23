
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
import Oneplace from './components/PlacePage';
// import MyAccommodation from './components/MyAccommodation';
// import myBookings from './components/BookingsPage';
// import ProfilePage from './components/ProfilePage';
import axios from 'axios';
import {UserContextProvider } from './UserContext'
import AddNewPlace from './components/AddNewPlace';
import EditForm from './components/EditForm';
import BookingsPage from './components/BookingsPage';
import SingleBookingPage from './components/SingleBookingPage';
import ProfilePage from './components/ProfilePage';
import BookingRequests from './components/BookingRequests';
import About from './components/About';
import Contact from './components/Contact'
import Layout from './components/Layout';
// import { HashRouter as Router, Routes, Route } from "react-router-dom";
// axios.defaults.baseURL="https://localhost:4000";
import TestVideo from './components/Testvideo';
axios.defaults.withCredentials=true;

function App() {
  
  return (

    
    <UserContextProvider>
<>
    <Router>
      {/* <div className="container"> */}
      <Header/>
    {/* <Footer>  */}
    <Layout> 

   

    
  <Routes>

    {/* <Route path="/profile" component={Profile} />
     */}
     
     <Route  exact path='/' element={<Home />} />
     {/* <Route exact path="/profile" element={<Profile />} /> */}
     {/* <Route exact path="/loginpage" element={<Loginpage />} />
     <Route exact path="/register" element={<Register/>} />
     <Route exact path="/acounts/:subpage?" element={<Acounts/>} />
     <Route exact path="/acounts/:subpage/:action" element={<Acounts/>} />
     <Route exact path="/acounts/:subpage/:action/:id" element={<Acounts/>} /> */}
     {/* <Route exact path="/acounts/myBookings" element={<MyBookings/>} />
     <Route exact path="/acounts/myAccommodation" element={<MyAccommodation/>} /> */}
     
  <Route exact path='/About' element={<About />} />
  <Route exact path='/Contact' element={<Contact />} />
  <Route exact path="/loginpage" element={<Loginpage />} />
  <Route exact path="/register" element={<Register />} />
  <Route exact path="/acounts/:subpage?" element={<Acounts />} />
  {/* <Route exact path="/acounts/ProfilePage" element={<ProfilePage />} /> */}
  <Route exact path="/acounts/myBookings" element={<BookingsPage />} />
  <Route exact path="/acounts/bookingReq" element={<BookingRequests />} />
  <Route exact path="/acounts/myBookings/:id" element={<SingleBookingPage />} />
  {/* <Route exact path="/acounts/MyBookings/:id" element={<Acounts />} /> */}
  <Route exact path="/acounts/:subpage/:action" element={<Acounts />} />
  
  {/* Place the /:subpage/:action/:id route below */}
  <Route exact path="/acounts/myAccommodation/new/:id" element={<AddNewPlace />} />
  <Route exact path = "/places/detail/:id" element={<EditForm />} />
  {/* <Route exact path="/acounts/:subpage/:action/:id" element={<Acounts />} /> */}
  <Route exact path ="/places/:id" element={<Oneplace/>} />
  <Route path="/test-video" element={<TestVideo />} />
</Routes>

    
  
     {/* </div> */}

    {/* <Header/> */}
    {/* <Footer/> */}
    </Layout>
    </Router>
</>
     </UserContextProvider>
    
  );
}

export default App;
