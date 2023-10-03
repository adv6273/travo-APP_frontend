import React, { useState } from 'react';
import { Link,Navigate } from 'react-router-dom';
import axios from 'axios';
const Register=()=>{

    
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("xyz");
    const [phoneno,setPhoneno]= useState("");
    const [redirect,setredirect]=useState(false);
    const registerUser= async (ev)=> {
        ev.preventDefault();
        try{
       const response= await   axios.post(" http://localhost:4000/register ", // FOR SENDING DETAILS TO CREATE A NEW USER 
          { 
          name,email,password,phoneno,
        })
        console.log("sending data ", response)

        alert("Registration Completed Successfully")
        setredirect(true);
        // console.log("sending data ",name,password,email,phoneno)
      }
      catch (e){
        
        console.log(e);
        console.log("sending data failed : user may be already exist "+ e);
        
        
      }
    }
    if(redirect)
    return <Navigate to={'/loginpage'} />
    return (
        <div>

<div className="min-h-screen flex flex-col mt-0">
      {/* Main content area */}
      <div className="flex flex-1">
        {/* Left half with background image */}
        <div
          className="w-4/5 h-screen ml-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsJTIwYm9va2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Right half with centered login form */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Register</h2>
            <form   onSubmit={registerUser} > 
              {/* Form fields go here */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  required minLength={3}
                  onChange={e=> setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Email 
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  required
                  onChange={e=>setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phoneno"
                >
                  Mobile No
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  type="number"
                  id="phoneno"
                  name="phoneno"
                  value={phoneno}
                  onChange={e=>
                    {
                        
                        setPhoneno(e.target.value)}
                        
                    }
                    required
                  placeholder="Enter your Phone no including Country Code"
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
                  required minLength={6}
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg focus:outline-none focus:shadow-outline-blue"
                type="submit"
              >
                Register
              </button>
                 <span className="flex items-center justify-center mt-2">
                Already have an account?{' '}
                <Link to="/loginpage" className="underline text-black ml-1">
                    Login Here
                </Link>
                </span>

            </form>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
}

export default Register;