// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../UserContext";

// export default function Yourplaces() {
//   const [places, setPlaces] = useState([]);
//   const { redirecttothatpagefromyourplaces, setredirecttothatpagefromyourplaces } = useContext(UserContext);

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/places")
//       .then(({ data }) => {
//         setPlaces(data);
//       })
//       .catch((err) => {
//         console.log("Err is ", err);
//       });
//   }, []);

//   const handleonclick = (e) => {
//     e.preventDefault();
//     setredirecttothatpagefromyourplaces(true);
//     // axios.get({"http://localhost:4000/places/"+e.target._id})
//   };

//   return (
//     <div className="text-center mt-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {places.length &&
//           places.map((place) => (
//             <Link
//               to={"http://localhost:3000/places/detail/" + place._id}
//               className="p-10"
//               key={place._id}
//             >
//               {console.log([place.photos[0]])}
//               <div className="w-full lg:max-w-full lg:flex">
//                 <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Mountain">
//                   {place.photos.length > 0 && (
//                     <img src={"http://localhost:4000/uploads/" + place.photos[0]} alt="no_image_provided" />
//                   )}
//                 </div>
//                 <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
//                   <div className="mb-8">
//                     <div className="text-gray-900 font-bold text-xl mb-2">{place.title}</div>
//                     <p className="text-gray-700 text-base">{place.description}</p>
//                   </div>
//                   <div className="flex items-center">
//                     <div className="text-sm">
//                       <p className="text-gray-900 leading-none">{place.owner.name}</p>
//                       <p className="text-gray-600 text-xl">${" " + place.price}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { baseUrl } from "../Urls";

export default function Yourplaces() {
  const [places, setPlaces] = useState([]);
  const { redirecttothatpagefromyourplaces, setredirecttothatpagefromyourplaces } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${baseUrl}/places`)
      .then(({ data }) => {
        setPlaces(data);
      })
      .catch((err) => {
        console.log("Err is ", err);
      });
  }, []);

  const handleonclick = (e) => {
    e.preventDefault();
    setredirecttothatpagefromyourplaces(true);
    // axios.get({"http://localhost:4000/places/"+e.target._id})
  };

  return (
    <div className="text-center mx-5 p-2 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.length &&
          places.map((place) => (
            <Link
              to={"http://localhost:3000/places/detail/" + place._id}
              className="p-10 border border-gray-400 bg-blue-100 rounded-lg"
              key={place._id}
            >
              {console.log([place.photos[0]])}
              <div className="w-full">
                <div className="h-72 flex-none bg-cover rounded-t-lg overflow-hidden" title="Mountain">
                  {place.photos.length > 0 && (
                    <img src={`${baseUrl}/uploads/` + place.photos[0]} alt="no_image_provided" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-4">
                  <div className="text-gray-900 font-bold text-xl mb-2">{place.title}</div>
                  {/* <p className="text-gray-700 text-base">{place.description}</p> */}
                  <div className="flex items-center mt-4">
                    <div className="text-sm flex-grow">
                      {/* <p className="text-gray-900 leading-none">{place.owner.name}</p> */}
                      <p className="text-gray-600 text-xl">${" " + place.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
