

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../Urls";
export default function Home(){
    const [places, setPlaces] = useState([]);
    
    useEffect(() => {
        axios.get(`${baseUrl}/all-places`).then(response => { 
            setPlaces(response.data);
        });
    }, []);

    return (
        <div className="mt-8 mx-4 mb-5 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3   lg:grid-cols-4">
            {places.map(place => (
                <Link to={'http://localhost:3000/places/'+place._id}  key={place._id}>
                    <div className="bg-blue-100 rounded-lg overflow-hidden shadow-md">
                        {place.photos?.[0] && (
                            <img className="w-full h-64 object-cover object-center" src={`${baseUrl}/uploads/`+place.photos?.[0]} alt="image_of_place"/>
                        )}
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{place.title}</h2>
                            <p className="text-gray-600 mb-2">{place.address}</p>
                            <p className="text-gray-800 font-semibold">{place.price} $ Per Night</p>
                        </div>
                    </div>
                </Link> 
            ))}
        </div>
    );
}
