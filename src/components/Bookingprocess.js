// import React, { useState } from 'react';
// import { differenceInCalendarDays, isBefore, isToday, parseISO } from 'date-fns';

// export default function BookingProcess({ place }) {
//   const [checkIn, setCheckIn] = useState('');
//   const [checkOut, setCheckOut] = useState('');
//   const [noGuest, setNoGuest] = useState(1);
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('000000');
//   const [alertMessage, setAlertMessage] = useState('');

//   let numberofNights = 0;
//   if (checkIn && checkOut) {
//     numberofNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
//   }

//   const handleCheckInChange = (ev) => {
//     const selectedDate = parseISO(ev.target.value);
//     const today = new Date();

//     if (isBefore(selectedDate, today) && !isToday(selectedDate)) {
//       setAlertMessage('Check-in date cannot be in the past.');
//     } else {
//       setAlertMessage('');
//       setCheckIn(ev.target.value);
//     }
//   };

//   const handleCheckOutChange = (ev) => {
//     const selectedDate = parseISO(ev.target.value);
//     const checkInDate = parseISO(checkIn);

//     if (checkIn && isBefore(selectedDate, checkInDate)) {
//       setAlertMessage('Check-out date cannot be before the check-in date.');
//     } else {
//       setAlertMessage('');
//       setCheckOut(ev.target.value);
//     }
//   };

//   return (
//     <div className="bg-white shadow p-6 rounded-2xl flex flex-col items-center">
//       <div className="text-xl">
//         <span className="text-2xl font-semibold mb-2 text-center">
//           Price:
//         </span>
//         {place.price} $ per night
//       </div>

//       <div className="flex space-x-4 w-full">
//         <div className="bg-blue-100 my-2 rounded py-2 px-2 flex-1">
//           <label className="block mb-0 mx-0" htmlFor="checkin-date">
//             Check in:
//           </label>
//           <input
//             type="date"
//             id="checkin-date"
//             value={checkIn}
//             onChange={handleCheckInChange}
//             className="w-full p-2 rounded border"
//           />
//         </div>
//         <div className="bg-blue-100 my-2 rounded py-2 px-2 flex-1">
//           <label className="block mb-0 mx-0" htmlFor="checkout-date">
//             Check Out:
//           </label>
//           <input
//             type="date"
//             id="checkout-date"
//             value={checkOut}
//             onChange={handleCheckOutChange}
//             className="w-full p-2 rounded border"
//           />
//         </div>
//       </div>

//       {alertMessage && (
//         <div className="bg-red-100 my-2 rounded py-2 px-4 w-full text-red-700">
//           {alertMessage}
//         </div>
//       )}

//       <div className="bg-blue-100 my-0 rounded py-2 px-4 w-full">
//         <label htmlFor="guests" className="block mb-0 mx-1 text-black">
//           Number of Guests:
//         </label>
//         <input
//           id="guests"
//           type="number"
//           className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={noGuest}
//           onChange={(ev) => setNoGuest(ev.target.value)}
//           placeholder="Enter number of guests"
//         />
//       </div>

//       {numberofNights > 0 && (
//         <div className="w-full">
//           <div className="bg-blue-100 my-0 rounded py-2 px-4 w-full">
//             <label htmlFor="name" className="block mb-0 mx-1 text-black">
//               Full Name:
//             </label>
//             <input
//               id="name"
//               type="text"
//               className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={name}
//               onChange={(ev) => setName(ev.target.value)}
//               placeholder="Enter your name"
//             />
//           </div>
//           <div className="bg-blue-100 my-0 rounded py-2 px-4 w-full">
//             <label htmlFor="mobile" className="block mb-0 mx-1 text-black">
//               Phone:
//             </label>
//             <input
//               id="mobile"
//               type="tel"
//               className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={mobile}
//               onChange={(ev) => setMobile(ev.target.value)}
//               placeholder="Enter your phone number"
//             />
//           </div>
//         </div>
//       )}

//       <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600">
//         Book this place
//       </button>
//         {numberofNights > 0 && (
//           <span>
//             {" $" + numberofNights * place.price}
//           </span>
//         )}
//     </div>
//   );
// }

import React, { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays, isBefore, isToday, parseISO } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { baseUrl } from '../Urls';
export default function BookingProcess({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [noGuest, setNoGuest] = useState(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState(1);
  // const [placeOwner, setplaceOwner] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  // const[bookingDate,setbookingDate]=useState('');
  const [bookingError, setBookingError] = useState('');
  const[redirect,setRedirect]=useState('');
   const {user}= useContext(UserContext);
  let numberofNights = 0;
  if (checkIn && checkOut) {
    numberofNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }
  useEffect(()=>{
    if(user){
      setName(user.name);
      setMobile(user.phoneno);
    }
  },[user])

  const handleCheckInChange = (ev) => {
    const selectedDate = parseISO(ev.target.value);
    const today = new Date();

    if (isBefore(selectedDate, today) && !isToday(selectedDate)) {
      setAlertMessage('Check-in date cannot be in the past.');
    } else {
      setAlertMessage('');
      setCheckIn(ev.target.value);
    }
  };

  const handleCheckOutChange = (ev) => {
    const selectedDate = parseISO(ev.target.value);
    const checkInDate = parseISO(checkIn);

    if (checkIn && isBefore(selectedDate, checkInDate)) {
      setAlertMessage('Check-out date cannot be before the check-in date.');
    } else {
      setAlertMessage('');
      setCheckOut(ev.target.value);
    }
  };

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      setBookingError('Please select both check-in and check-out dates.');
      return;
    }
    if (!name || !mobile) {
      setBookingError('Name and phone number are mandatory.');
      return;
    }
    try{
      setBookingError('');
    // Proceed with the booking
    const today = new Date();
    // setbookingDate(today);
     const response= await  axios.post(`${baseUrl}/bookings`,
      {
        checkIn,
        checkOut,
        bookingDate : today,
        noGuest,
        name,
        mobile,
        place:place._id,
        placeOwner:place.owner,
        price: (numberofNights*place.price)
        
      } );
      const bookingId=response.data._id;
      setRedirect(`/acounts/myBookings/${bookingId}`);
    console.log(response)

    alert('Booking confirmed');
    setCheckIn('');
    setCheckOut('');
    setName('');
    setMobile('');
    }
    catch(err)
    {
      alert("place could not booked by error, check if you are logged in or not ", err);
    }
  };
  if(redirect) {
    return <Navigate to={redirect}/>
  }

  return (
    <div className="bg-white shadow p-6 rounded-2xl flex flex-col items-center">
      <div className="text-xl">
        <span className="text-2xl font-semibold mb-2 text-center">
          Price:
        </span>
        {place.price} $ per night
      </div>

      <div className="flex space-x-4 w-full">
        <div className="bg-blue-100 my-2 rounded py-2 px-2 flex-1">
          <label className="block mb-0 mx-0" htmlFor="checkin-date">
            Check in:
          </label>
          <input
            type="date"
            id="checkin-date"
            value={checkIn}
            onChange={handleCheckInChange}
            className="w-full p-2 rounded border"
          />
        </div>
        <div className="bg-blue-100 my-2 rounded py-2 px-2 flex-1">
          <label className="block mb-0 mx-0" htmlFor="checkout-date">
            Check Out:
          </label>
          <input
            type="date"
            id="checkout-date"
            value={checkOut}
            onChange={handleCheckOutChange}
            className="w-full p-2 rounded border"
          />
        </div>
      </div>

      {alertMessage && (
        <div className="bg-red-100 my-2 rounded py-2 px-4 w-full text-red-700">
          {alertMessage}
        </div>
      )}

      <div className="bg-blue-100 my-0 rounded py-2 px-4 w-full">
        <label htmlFor="guests" className="block mb-0 mx-1 text-black">
          Number of Guests:
        </label>
        <input
          id="guests"
          type="number"
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={noGuest}
          onChange={(ev) => setNoGuest(ev.target.value)}
          placeholder="Enter number of guests"
        />
      </div>

      {numberofNights > 0 && (
        <div className="w-full">
          <div className="bg-blue-100 my-0 rounded py-2 px-4 w-full">
            <label htmlFor="name" className="block mb-0 mx-1 text-black">
              Full Name:
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="bg-blue-100 my-0 rounded py-2 px-4 w-full">
            <label htmlFor="mobile" className="block mb-0 mx-1 text-black">
              Phone:
            </label>
            <input
              id="mobile"
              type="tel"
              className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={mobile}
              onChange={(ev) => setMobile(ev.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      )}

      {bookingError && (
        <div className="bg-red-100 my-2 rounded py-2 px-4 w-full text-red-700">
          {bookingError}
        </div>
      )}

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
        onClick={handleBooking}
      >
        Book this place 
        {numberofNights > 0 && (
          <span>
          {" "} in {" $" + numberofNights * place.price}
          </span>
        )}
      </button>
    </div>
  );
}

