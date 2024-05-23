

import Placenavbarforrequest from './Placenavbarforbookingreq';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, differenceInCalendarDays } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../Urls';
function BookingRequests() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // useNavigate hook for navigation

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${baseUrl}/BookingRequests`, {
                    withCredentials: true,
                });
                setBookings(response.data);
            } catch (err) {
                setError('Failed to fetch bookings');
            }
        };
        
        fetchBookings();
    }, []);

    const handleDelete = async (bookingId) => {
        const confirmation = window.confirm("Are you sure you want to delete this booking?");
        if (!confirmation) {
            return;
        }

        try {
            const response = await axios.delete(`${baseUrl}/BookingRequests/${bookingId}`, {
                withCredentials: true,
            });
            alert(response.data.message || 'Booking deleted successfully');
            setBookings(bookings.filter(booking => booking._id !== bookingId));
            navigate('/acounts/bookingReq'); // Redirect to places list after deletion
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete booking');
        }
    };

    return (
        <div className='mb-10' >
            <div className='mb-4'> 
                <Placenavbarforrequest />
            </div>

            {error && <p>{error}</p>}
            {bookings.length > 0 && bookings.map((booking) => (
                <div 
                    key={booking._id} className='flex gap-4  mx-5 grow mt-5 text-xl bg-blue-100'>
                    <div className='w-1/4 h-auto'> 
                        <img 
                            src={booking.place && booking.place.photos && booking.place.photos.length > 0 
                                ? `${baseUrl}/uploads/${booking.place.photos[0]}` 
                                : 'image_not_present'} 
                            alt="Booking" 
                            className='w-full h-auto object-cover aspect-square rounded' 
                        />
                    </div>
                    <div className='w-2/3'>
                        <h2 className='italic text-xl font-bold'>{booking.place?.title}</h2>
                        {booking.place && (
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.place.address)}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className='underline'
                            >
                                {booking.place.address}
                            </a>
                        )}
                        <table className="table-auto border-collapse border border-black w-2/3 mx-auto">
                            <thead>
                                <tr>
                                    <th className="border border-black px-4 py-2">Detail</th>
                                    <th className="border border-black px-4 py-2">Information</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black px-4 py-2">Booked By</td>
                                    <td className="border border-black px-4 py-2">{booking.name}</td>
                                </tr>
                                <tr>
                                    <td className="border border-black px-4 py-2">Mobile No</td>
                                    <td className="border border-black px-4 py-2">{booking.mobile}</td>
                                </tr>
                                <tr>
                                    <td className="border border-black px-4 py-2">Booked on Date</td>
                                    <td className="border border-black px-4 py-2">{format(new Date(booking.bookingDate), 'dd-MM-yyyy')}</td>
                                </tr>
                                <tr>
                                    <td className="border border-black px-4 py-2">Check-in Date</td>
                                    <td className="border border-black px-4 py-2">{format(new Date(booking.checkIn), 'dd-MM-yyyy')}</td>
                                </tr>
                                <tr>
                                    <td className="border border-black px-4 py-2">Check-out Date</td>
                                    <td className="border border-black px-4 py-2">{format(new Date(booking.checkOut), 'dd-MM-yyyy')}</td>
                                </tr>
                                <tr>
                                    <td className="border border-black px-4 py-2">No of Guests</td>
                                    <td className="border border-black px-4 py-2">{booking.noGuest}</td>
                                </tr>
                                <tr>
                                    <td className="border border-black px-4 py-2">Number of Nights</td>
                                    <td className="border border-black px-4 py-2">
                                        {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-black px-4 py-2">Total Price</td>
                                    <td className="border border-black px-4 py-2">$ {booking.price}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='w-1/12 flex items-center justify-center'>
                        <button
                            onClick={() => handleDelete(booking._id)}
                            className="bg-red-500 py-2 px-4 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition duration-300"
                            type="button"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookingRequests;
