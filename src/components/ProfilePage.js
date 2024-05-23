// import React, { useContext, useState } from 'react';
// import { UserContext } from '../UserContext';
// import axios from 'axios';
// import { Navigate } from 'react-router-dom';

// const ProfilePage = () => {
//   const { user,setUser,setredirect_to_homepage_after_l } = useContext(UserContext);
//   const [redirect,setredirect] =useState(null);
//   const handleLogout = async () => {
//     // Implement your logout logic here
//     await axios.post("http://localhost:4000/logout");
//     setUser(null);
//     setredirect('/')
//     setredirect_to_homepage_after_l(true)
//   };
//   if(redirect)
//   {
//     return <Navigate to={redirect} />
//   }
//   return (
//      <div className="flex flex-col items-center justify-center ">
//     {/* <div className="flex items-center mt-20"> */}
//     <div className="flex items-center mt-10" >

//     <img
//       src="https://cdn3.vectorstock.com/i/1000x1000/52/97/image-a-person-icon-people-on-blue-vector-27565297.jpg"
//       alt="user icon"
//       className="w-20 h-20 rounded-full mt-0"
//       />
//     <h2 className="text-2xl  text-center">
//   Welcome <span style={{ fontWeight: 'bold' }}>{user.name}</span> to travo-APP
// </h2>
//       </div>

//     <div className="flex items-center mt-10">
//       <img
//         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtn47D__Z26VwPvJhETYh0TyczKQp2qrIQDQkZypyv&s"
//         alt="Email Icon"
//         className="w-35 h-20 mr-2" 
//       />
//       <h2 className="text-2xl  text-center">
//       Your Registered email is <span style={{ fontWeight: 'bold' }}>{" "+user.email}</span>
        
//         </h2>
//     </div>
//     <div className="flex items-center mt-10">
//       <img
//         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1gx897sonpAZSaKR9ua3lilvs3-wYR_6AMQ&usqp=CAU"
//         alt="phnoe Icon"
//         className="w-35 h-20 mr-2" 
//       />
//       <h3 className="text-2xl  text-center">
//         Your Registered Phone no is <span  style={{ fontWeight: 'bold' }}>{" "+user.phoneno}</span>
//       </h3>
//     </div>
    
//     <button
//       className="inline-block cursor-pointer rounded-md bg-blue-500 px-4 py-3 mt-10 text-center text-sm font-semibold  text-white transition duration-200 ease-in-out hover:bg-red-800" onClick={handleLogout}
//     >
//       logout
//     </button>
//   </div>
  

//   );
// };


// export default ProfilePage;


// // import React, { useContext } from 'react';
// // import { UserContext } from '../UserContext';
// // const ProfilePage = () => {
// //   const { user, logout } = useContext(UserContext);

// //   const handleLogout = () => {
// //     // Implement your logout logic here
// //     logout();
// //   };
// //   const userProfileStyle = {
// //     display: 'flex',
// //     alignItems: ' center',
// //     gap: '20px',
// //     fontFamily: 'Arial, sans-serif',
// //     padding: '20px',
// //     backgroundColor: '#f0f0f0', // Background color
// //     borderRadius: '10px', // Rounded corners
// //     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow for a lifted effect
// //   };

// //   const userIconStyle = {
// //     width: '100px', // Adjust the size of the user icon
// //     height: '100px', // Adjust the size of the user icon
// //     borderRadius: '50%', // Rounded shape for the user icon
// //     objectFit: 'cover', // Maintain aspect ratio for the image
// //     border: '2px solid #fff', // White border for the user icon
// //   };

// //   const userNameStyle = {
// //     fontSize: '24px', // Adjust the font size for the user name
// //     margin: '0',
// //   };

// //   const emailStyle = {
// //     display: 'flex',
// //     alignItems: 'center',
// //     fontSize: '18px', // Adjust the font size for the email
// //     color: '#555', // Text color for the email
// //   };

// //   const emailIconStyle = {
// //     marginRight: '10px', // Spacing between the email icon and address
// //   };

// //   return (
// //     <div style={userProfileStyle} className="user-profile">
// //       <div style={userIconStyle} className="user-icon">
// //         {/* Large user icon (you can use an image or an icon font) */}
// //         <img
// //           src="user-icon.png"
// //           alt="User Icon"
// //           style={userIconStyle}
// //         />
// //       </div>
// //       <div style={userNameStyle} className="user-details">
// //         <h1 style={userNameStyle} className="user-name">John Doe</h1>
// //         <div style={emailStyle} className="email">
// //           {/* Email icon (you can use an icon font) */}
// //           <i
// //             className="fa fa-envelope"
// //             style={emailIconStyle}
// //           ></i>
// //           {/* Email address */}
// //           <span className="email-address">
// //             johndoe@example.com
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfilePage;



import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { baseUrl } from '../Urls';

const ProfilePage = () => {
  const { user, setUser, setRedirectToHomepageAfterLogout } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  const handleLogout = async () => {
    await axios.post(`${baseUrl}/logout`);
    setUser(null);
    setRedirect('/');
    setRedirectToHomepageAfterLogout(true);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen p-6">
      <div className="flex items-center mt-10 space-x-4 bg-white p-4 rounded-lg shadow-lg">
        <img
          src="https://cdn3.vectorstock.com/i/1000x1000/52/97/image-a-person-icon-people-on-blue-vector-27565297.jpg"
          alt="User Icon"
          className="w-20 h-20 rounded-full"
        />
        <h2 className="text-2xl font-semibold text-center">
          Welcome <span className="font-bold">{user.name}</span> to travo-APP
        </h2>
      </div>

      <div className="flex items-center mt-10 space-x-4 bg-white p-4 rounded-lg shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-blue-500"
          
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 12c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2zm-6 0c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2zm6 8H6c-1.105 0-2-.895-2-2V8c0-1.105.895-2 2-2h12c1.105 0 2 .895 2 2v10c0 1.105-.895 2-2 2zm-4-4c0 1.105.895 2 2 2h6c1.105 0 2-.895 2-2v-2c0-1.105-.895-2-2-2h-6c-1.105 0-2 .895-2 2v2z"
          />
        </svg>
        <h2 className="text-2xl text-center">
          Your registered email is <span className="font-bold">{user.email}</span>
        </h2>
      </div>

      <div className="flex items-center mt-10 space-x-4 bg-white p-4 rounded-lg shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5h6M3 9h6m-6 4h6m-6 4h6m6-4h6M9 5h6m-6 4h6m-6 4h6m-6 4h6m6-4v1.5a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 015 18.5V17m6-2h1m2 0h2m-2 0v2m0-2V7m2 0H7v2"
          />
        </svg>
        <h3 className="text-2xl text-center">
          Your registered phone number is <span className="font-bold">{user.phoneno}</span>
        </h3>
      </div>

      <button
        className="inline-block cursor-pointer rounded-md bg-red-500 px-4 py-3 mt-10 text-center text-sm font-semibold text-white transition duration-200 ease-in-out hover:bg-red-700"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
