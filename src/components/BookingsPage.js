import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceNavbar from './PlaceNavbar';
import { format, differenceInCalendarDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { baseUrl } from '../Urls';
function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${baseUrl}/my-Bookings`, {
                    withCredentials: true,
                });
                setBookings(response.data);
            } catch (err) {
                setError('Failed to fetch bookings');
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className='mr-5 mb-5 ml-6'>
            <div className='mb-4'>
                <PlaceNavbar />
            </div>

            {error && <p>{error}</p>}
            {bookings.map((booking) => (
                <Link
                    to={`/acounts/myBookings/${booking._id}`}
                    key={booking._id}
                    className='flex gap-4 pr-13 grow mt-5 text-xl bg-blue-100'
                >
                    <div className='w-1/5 h-auto'>
                        {booking.place?.photos?.[0] ? (
                            <img
                                src={`${baseUrl}/uploads/${booking.place.photos[0]}`}
                                alt="Place"
                                className='w-full h-auto object-cover aspect-square rounded'
                            />
                        ) : (
                            <div className='w-full h-auto object-cover aspect-square rounded bg-gray-300'>
                                No Image Provided
                            </div>
                        )}
                    </div>
                    <div className='w-2/3'>
                        <h2 className='italic text-xl font-bold'>{booking.place?.title}</h2>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.place?.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='underline'
                        >
                            {booking.place?.address}
                        </a>
                        <p>
                            <h2 className='font-bold'>Booked on Date:</h2>
                            {format(new Date(booking.bookingDate), 'dd-MM-yyyy')}
                        </p>
                        <p>
                            <h2 className='font-bold'>Number of Nights:</h2>
                            {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}
                        </p>
                        <p>
                            <h2 className='font-bold'>Total Price:</h2>
                            {`$${booking.price}`}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Bookings;
