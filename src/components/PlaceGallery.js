import axios from "axios";

import { useEffect, useState } from "react";
import { baseUrl } from "../Urls";
// import { Link, useParams } from "react-router-dom";
// import Bookingprocess from "./Bookingprocess";
export default function PlaceGallery(place) {
//   const { id } = useParams();
//   const [place, setplace] = useState([]);
  const [showphotos, setshowphotos] = useState(false);
  
  if (showphotos) {
    return (
      <div className=" bg-white flex flex-col items-center justify-center min-h-screen">
        <div className="my-4">
          <h2 className="text-2xl text-center">Photos from 
          <span className="underline font-semibold mx-1 italic">{place.title}</span>
          {/* {place.title} */}
          </h2>
        </div>
        <div className="p-8 grid gap-4">
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              // <div key={index} className="w-96 h-96">
                <img
                  src={`${baseUrl}/uploads/` + photo}
                  alt="image_of_place"
                  className="w-full h-full "
                />
              // </div>
            ))}
        </div>
        <button
          onClick={() => setshowphotos(false)}
          className=" mt-1 fixed right-40 top-40 py-1 bg-black text-white px-4 rounded-2xl font-semibold shadow shadow-md shadow-gray-500 border-2 border-black flex items-center "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
          Close Photos
        </button>
      </div>
    );
  }
 
  return (
    
      < div className="max-w-screen-lg mx-auto p-4 mt-4 bg-blue-100 mx-8 px-8 py-4">
        <h1 className="text-3xl">{place.title}</h1>
       
        <div className="max-w-screen-lg mx-auto p-4 ">
          <div className="grid gap-2 grid-cols-2 ">
            <div className="aspect-w-1 aspect-h-1">
              {place.photos?.[0] && (
                <img
                  src={`${baseUrl}/uploads/` + place.photos[0]}
                  alt="no_image_provided"
                  className="w-full h-full object-cover rounded-2xl cursor-pointer"
                  onClick={()=>setshowphotos(true)}
                  />
                )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="aspect-w-1 aspect-h-1">
                {place.photos?.[1] && (
                  <img
                      onClick={()=>setshowphotos(true)}
                  src={`${baseUrl}/uploads/` + place.photos[1]}
                  alt="no_image_provided"
                  className="w-full h-full object-cover rounded-2xl cursor-pointer"
                  />
                )}
              </div>
              <div className="aspect-w-1 aspect-h-1">
                {place.photos?.[2] && (
                  <img
                      onClick={()=>setshowphotos(true)}
                    src={`${baseUrl}/uploads/` + place.photos[2]}
                    alt="no_image_provided"
                    className="w-full h-full object-cover rounded-2xl cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              onClick={() => setshowphotos(true)}
              className="mt-1 py-2 px-4 rounded bg-white font-semibold shadow shadow-md shadow-gray-500 border-2 border-black flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Show More Photos
            </button>
          </div>
        </div>


                

      
    </div>
  );
}
