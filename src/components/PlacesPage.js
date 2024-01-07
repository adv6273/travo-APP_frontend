import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddNewPlace from "./AddNewPlace";
import Yourplaces from "./Yourplaces";
import axios from "axios";
export default function PlacePage() {
  const { action ,id} = useParams();
  // console.log(action);

  useEffect(()=>{
    if(!id){
      return;
    }
  
      axios.get("http://localhost:4000/places"+id);
    
  },[id])
  return (
    <>
      <div>
      {action === 'new' && (
          <AddNewPlace />
        )}
        {action !== "new" && (
          <>
          
            <div className="text-center mt-20">
              <Link
                to={"/acounts/myAccommodation/new"}
                className="inline-flex items-center gap-1 bg-primary text-white py-2 px-6 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  style={{ fill: "#ffffff" }}
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c-17.7 0-32-14.3-32-32s14.3-32 32-32H256V80z" />
                </svg>
                Add New Place
              </Link>
            </div>
            <div>
              <Yourplaces />
            </div>
          </>
        )}

       
      </div>
    </>
  );
}
