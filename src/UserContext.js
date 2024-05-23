import { createContext,useEffect,useState  } from "react";
import axios from 'axios';
import { baseUrl } from "./Urls";
export const UserContext= createContext({});
export function UserContextProvider({children})
{
    const [user,setUser]=useState(null);
    const [ready,setready]= useState(false);
    const [redirect_to_homepage_after_logout,setredirect_to_homepage_after_l]= useState(false);
    const [redirecttothatpagefromyourplaces,setredirecttothatpagefromyourplaces]= useState(false);
    const[placeforyourplace,setplaceforyourplace]=useState([]);
    const[detailforyourplace,setdetailforyourplace] =useState("");
    useEffect(  ()=>{

        if(!user)
        {
            axios.get(`${baseUrl}/profile`).then(({data})=>{
            setready(true);
             setUser(data);

         })
        
        }
    }, [])
    // }, [user])
    return (
        <UserContext.Provider value={{user,setUser,ready,setredirect_to_homepage_after_l,redirecttothatpagefromyourplaces,setredirecttothatpagefromyourplaces,detailforyourplace,setdetailforyourplace,}}>

            {children}

        </UserContext.Provider>
    );

}


// import { createContext, useEffect, useState } from "react";
// import axios from 'axios';

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     if (!user) {
//       axios.get("http://localhost:4000/profile")
//         .then(({ data }) => {
//           setUser(data);
//           setLoading(false); // Set loading to false after successful fetch
//         })
//         .catch((error) => {
//           console.error("Error fetching user data:", error);
//           setLoading(false); // Set loading to false even on error
//         });
//     }
//   }, [user]); // Make the effect depend on user to refetch if user changes

//   return (
//     <UserContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// }
