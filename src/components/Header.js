

// // import { Link } from "react-router-dom";
// // import React, { useContext } from "react";
// // import { UserContext } from "../UserContext";

// // const Header = () => {
// //   const user = useContext(UserContext);
// //   return (
// //     <div>
// //       {/* <nav className="bg-white py-2 px-4 border-gray-200 dark:bg-gray-900 mb-300"  style={ {"back
// //       ground-color":"red"}} > Reduced top padding */}
// //       {/* <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto"> */}
// //       <nav className="bg-white py-2 px-4 border-b border-gray-200 dark:bg-gray-900 mb-0">
// //         {/* {" "} */}
// //         {/* Added border-b for bottom border */}
// //         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
// //           <Link to="/" className="flex items-center">
// //             <img
// //               src="https://cdn-icons-png.flaticon.com/128/2744/2744268.png"
// //               className="h-6 mr-3"
// //               alt="Flowbite Logo"
// //             />
// //             <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
// //               travo-APP
// //             </span>
// //           </Link>

           

// //           <div
// //             className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
// //             id="navbar-user"
// //           >
// //             <ul className="flex flex-col font-medium p-2 md:p-0 mt-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
// //               <li>
// //                 <Link
// //                   to="/"
// //                   className="block py-1 pl-2 pr-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
// //                   aria-current="page"
// //                 >
// //                   Home
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link
// //                   to="/"
// //                   className="block py-1 pl-2 pr-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700"
// //                 >
// //                   About
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link
// //                   to="/"
// //                   className="block py-1 pl-2 pr-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover-bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent dark:border-gray-700"
// //                 >
// //                   Services
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link
// //                   to="/"
// //                   className="block py-1 pl-2 pr-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover-bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent dark:border-gray-700"
// //                 >
// //                   Pricing
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link
// //                   to="/"
// //                   className="block py-1 pl-2 pr-3 text-gray-900 rounded hover-bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover-text-blue-500 dark:hover-bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent dark:border-gray-700"
// //                 >
// //                   Contact
// //                 </Link>
// //               </li>
// //             </ul>
// //           </div>
// //         </div>
// //           <Link to="/loginpage" className="flex items-center">
// //             <img
// //               src="https://cdn-icons-png.flaticon.com/128/2744/2744268.png"
// //               className="h-6 mr-3"
// //               alt="Flowbite Logo"
// //             />
// //             <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
// //               login
// //             </span>
// //           </Link>
// //       </nav>
// //     </div>
// //   );
// // };

// // export default Header;

// import { Link } from "react-router-dom";
// import React, { useContext } from "react";
// import { UserContext } from "../UserContext";

// const Header = () => {
//   const {user} = useContext(UserContext);
// if(user)  console.log(user.name)
//   // const {name}=user;
//   // console.log(name)
//   return (
//     <div>
//       <nav className="bg-white py-2 px-4 border-b border-gray-200 dark:bg-gray-900 mb-0">
//         <div className="max-w-screen-xl flex items-center justify-between mx-auto">
//           <Link to="/" className="flex items-center">
//             <img
//               src="https://cdn-icons-png.flaticon.com/128/2744/2744268.png"
//               className="h-6 mr-3"
//               alt="Flowbite Logo"
//             />
//             <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
//               travo-APP
//             </span>
//           </Link>

//           <div className="flex items-center space-x-4">
//             <ul className="flex font-medium space-x-4">
//               <li>
//                 <Link
//                   to="/"
//                   className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
//                   aria-current="page"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/"
//                   className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/"
//                   className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
//                 >
//                   Services
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/"
//                   className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
//                 >
//                   Pricing
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/"
//                   className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
            
//           </div>
//           <Link to={user ? '/acounts' :  "/loginpage" } className="flex items-center">
//             {/* <img
//               src="https://cdn-icons-png.flaticon.com/128/2744/2744268.png"
//               className="h-6 mr-3"
//               alt="Flowbite Logo"
//             /> */}
//             <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
//               {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
//               <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
//                   <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-black" style={{color:"black"}}>
//                      {user ? " hello " + user.name : "login"}
//                      </span>

        

            
//           </Link>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Header;

import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <nav className="bg-white py-3 px-4 border-b border-gray-200 dark:bg-gray-900 mb-0">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2744/2744268.png"
              className="h-6 mr-3"
              alt="Flowbite Logo"
              style={{ color: "blue" }}
            />
            <span
              className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
              style={{ color: "blue" }}
            >
              travo-APP
            </span>
          </Link>

          <div
            className="  flex py-3 items-center space-x-4 bg-blue-500 rounded-3xl px-5 mx-5 text-white"
            // className="  flex py-3 items-center space-x-4"
            // style={{
            //   // background: "linear-gradient(to right, #007bff, #00bfff)",
            //   background: "blue",
            //   borderRadius: "25px", // Adjust the radius to your liking
            //   padding: "5px 20px", // Add padding
            //   color:"white"
            // }}
          >
            <ul className="flex font-medium space-x-20 text-2xl">
              <li>
                <Link
                  to="/"
                  className="text-white  hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/About"
                  className="text-white hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                >
                  About
                </Link>
              </li>
             
             
              <li>
                <Link
                  to="/Contact"
                  className="text-white hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <Link
            to={user ? "/acounts" : "/loginpage"}
            className="flex items-center"
            style={{ color: "blue" }}
          >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

            <span
              className="self-center text-xl gap-1 font-semibold whitespace-nowrap dark:text-black"
              style={{ color:"blue" }}
            >
              {user ? " hello " + user.name : " login"}
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
