// import React, { useState } from 'react'
// const Loginpage=()=>{
//     return(

//         <div className="min-h-screen flex flex-col">


//   {/* Main content area */}
//   <div className="flex flex-1">
//     {/* Left half with background image */}
//     <div className="w-1/2 h-screen ml-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjBib29raW5nfGVufDB8fDB8fHww&w=1000&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//     </div>

//     {/* Right half with centered login form */}
//     <div className="w-1/2 flex items-center justify-center p-8">
//       <div className="w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-4">Login</h2>
//         <form>
//           {/* Form fields go here */}
//           <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//                   Username
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
//                   type="text"
//                   id="username"
//                   name="username"
//                   placeholder="Enter your username"
//                 />
//               </div>
      
//               <div className="mb-6">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                   Password
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
//                   type="password"
//                   id="password"
//                   name="password"
//                   placeholder="Enter your password"
//                 />
//               </div>
      
//               <button
//                 className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg focus:outline-none focus:shadow-outline-blue"
//                 type="submit"
//               >
//                 Log In
//               </button>
//         </form>
//       </div>
//     </div>
//   </div>
// </div>

     
      
//     );
// }
// export default Loginpage;

import React,{useContext, useState} from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Loginpage = () => {
  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
  // let redirect=false;  
  const [redirect,setRedirect]= useState(false);
const {setUser}=  useContext(UserContext);
  const loginUser=async (ev)=>{
      ev.preventDefault();
      try{
        const response= await axios.post("http://localhost:4000/login",
        // const response= await axios.post("/login",
        {  email,password}
        );
        console.log(response);
        // redirect=true;
        setRedirect(true);
        setUser(response.data);
        alert("login successfully  ");
      }
      catch(err)
      {
        // console.log("log in failed at loginPage/client")
        // alert("login failed due to" + err);
        console.log(err+" email/passowrd is not correct ");
        alert("email/password is not correct ");
        // console.log(err);
      }
  }
    if(redirect)
    {
      return <Navigate to={'/'}  />
    }
  return (
    <div className="min-h-screen flex flex-col mt-0">
      {/* Main content area */}
      <div className="flex flex-1">
        {/* Left half with background image */}
        <div
          className="w-4/5 h-screen ml-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjBib29raW5nfGVufDB8fDB8fHww&w=1000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Right half with centered login form */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={loginUser}>
              {/* Form fields go here */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={e=>setEmail(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                />
              </div>

              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg focus:outline-none focus:shadow-outline-blue"
                type="submit"
              >
                Log In
              </button>
                 <span className="flex items-center justify-center mt-2">
                Don't have an account?{' '}
                <Link to="/register" className="underline text-black ml-1">
                    Register Here
                </Link>
                </span>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;

