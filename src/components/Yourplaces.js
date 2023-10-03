import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Yourplaces() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/places")
      .then(({ data }) => {
        setPlaces(data);
      })
      .catch((err) => {
        console.log("Err is ", err);
      });
  }, []);

  return (
    <div className="text-center mt-4">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> */}
        <div>
        {places.length &&
          places.map((place) => (
            <Link to={'/acounts/'} className="p-10">
   
    <div className=" w-full lg:max-w-full lg:flex">
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
    //   style={{background-image: "url('/mountain.jpg')"}}
    title="Mountain">
           { place.photos.length>0 && (
            <img  src={place.photos[0]} alt="no_image_provided"
            />
           )}
      </div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
         
          <div className="text-gray-900 font-bold text-xl mb-2">{place.title}</div>
          <p className="text-gray-700 text-base">{place.description}</p>
        </div>
        <div className="flex items-center">
        
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{place.owner.name}</p>
            <p className="text-gray-600 text-xl">${" "+place.price}</p>
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
