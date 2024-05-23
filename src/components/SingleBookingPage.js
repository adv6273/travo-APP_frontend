import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format, differenceInCalendarDays } from "date-fns";
import PlaceNavbar from './PlaceNavbar';
import { baseUrl } from "../Urls";

export default function SingleBookingPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchBooking = async () => {
                try {
                    const response = await axios.get(`${baseUrl}/acounts/myBooking/${id}`, {
                        withCredentials: true,
                    });
                    console.log('Booking data:', response.data);
                    setBooking(response.data);
                } catch (err) {
                    console.error('Error fetching booking:', err);
                    setError('Failed to fetch booking details');
                } finally {
                    setLoading(false);
                }
            };
            fetchBooking();
        }
    }, [id]);

    const handleDelete = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this booking?");
        if (!confirmation) {
            return;
        }

        try {
            await axios.delete(`${baseUrl}/acounts/myBooking/${id}`, {
                withCredentials: true,
            });
            navigate('/acounts/myBookings'); // Redirect to bookings list after deletion
        } catch (err) {
            alert('Failed to delete booking');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!booking) {
        return <div>No booking found</div>;
    }

    return (
        // <div>
        //     <div className='mb-4'>
        //         <PlaceNavbar />
        //     </div>
        //     <div className="max-w-screen-lg mx-auto p-4 mt-4 bg-blue-100 mx-8 px-8 py-4">
        //         <h1 className="text-3xl">{booking.place?.title}</h1>
        //         <a
        //             href={"https://maps.google.com/?q=" + booking.place.address? booking.place.address : "Not provided"}
        //             className="my-2  flex gap-1 black font-semibold underline italic  black"
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             <svg
        //                 xmlns="http://www.w3.org/2000/svg"
        //                 fill="none"
        //                 viewBox="0 0 24 24"
        //                 stroke-width="1.5"
        //                 stroke="currentColor"
        //                 class="w-6 h-6"
        //             >
        //                 <path
        //                     stroke-linecap="round"
        //                     stroke-linejoin="round"
        //                     d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        //                 />
        //                 <path
        //                     stroke-linecap="round"
        //                     stroke-linejoin="round"
        //                     d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        //                 />
        //             </svg>
        //             {booking.place.address}
        //         </a>
        //         <div className="max-w-screen-lg mx-auto p-4 ">
        //             <div className="grid gap-2 grid-cols-[2fr_1fr] ">
        //                 <div className="aspect-w-1 aspect-h-1">
        //                     {booking.place?.photos?.[0] && (
        //                         <img
        //                             src={"http://localhost:4000/uploads/" + booking.place?.photos[0]}
        //                             alt="no_image_provided"
        //                             className="w-full h-full object-cover rounded-2xl cursor-pointer"
        //                         />
        //                     )}
        //                 </div>
        //                 <div className="flex flex-col gap-2">
        //                     <div className="aspect-w-1 aspect-h-1">
        //                         {booking.place.photos?.[1] && (
        //                             <img
        //                                 src={"http://localhost:4000/uploads/" + booking.place?.photos[1]}
        //                                 alt="no_image_provided"
        //                                 className="w-full h-full object-cover rounded-2xl cursor-pointer"
        //                             />
        //                         )}
        //                     </div>
        //                     <div className="aspect-w-1 aspect-h-1">
        //                         {booking.place.photos?.[2] && (
        //                             <img
        //                                 src={"http://localhost:4000/uploads/" + booking.place?.photos[2]}
        //                                 alt="no_image_provided"
        //                                 className="w-full h-full object-cover rounded-2xl cursor-pointer"
        //                             />
        //                         )}
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="flex justify-end items-center"></div>
        //         </div>
        //         <div>
        //             <h2 className="text-2xl mb-1 font-bold">Description:</h2>
        //             {booking.place?.description}
        //         </div>
        //         <div className="flext item-center grid grid-cols-[2fr_1fr] mt-4">
        //             <div>
        //                 <table className="table-auto border-collapse border border-black w-2/3 mx-auto">
        //                     <thead>
        //                         <tr>
        //                             <th className="border border-black px-4 py-2">Detail</th>
        //                             <th className="border border-black px-4 py-2">Information</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody>
        //                         <tr>
        //                             <td className="border border-black px-4 py-2">Name of Guest</td>
        //                             <td className="border border-black px-4 py-2">{booking.name}</td>
        //                         </tr>
        //                         <tr>
        //                             <td className="border border-black px-4 py-2">Mobile No</td>
        //                             <td className="border border-black px-4 py-2">{booking.mobile}</td>
        //                         </tr>
        //                         <tr>
        //                             <td className="border border-black px-4 py-2">Booked on Date</td>
        //                             <td className="border border-black px-4 py-2">{format(new Date(booking.bookingDate), 'dd-MM-yyyy')}</td>
        //                         </tr>
        //                         <tr>
        //                             <td className="border border-black px-4 py-2">Check-in Date</td>
        //                             <td className="border border-black px-4 py-2">{format(new Date(booking.checkIn), 'dd-MM-yyyy')}</td>
        //                         </tr>
        //                         <tr>
        //                             <td className="border border-black px-4 py-2">Check-out Date</td>
        //                             <td className="border border-black px-4 py-2">{format(new Date(booking.checkOut), 'dd-MM-yyyy')}</td>
        //                         </tr>
        //                         <tr>
        //                             <td className="border border-black px-4 py-2">No of Guests</td>
        //                             <td className="border border-black px-4 py-2">{booking.noGuest}</td>
        //                         </tr>
        //                         <tr>
        //                             <td className="border border-black px-4 py-2">Number of Nights</td>
        //                             <td className="border border-black px-4 py-2">
        //                                 {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}
        //                             </td>
        //                         </tr>
        //                         <tr>
        //                             <td className="border border-black px-4 py-2">Total Price</td>
        //                             <td className="border border-black px-4 py-2">$ {booking.price}</td>
        //                         </tr>
        //                     </tbody>
        //                 </table>
        //             </div>

        //             <div>
        //                 <h2 className="font-bold">
        //                     Price per Night:
        //                 </h2>
        //                 {"$ " + booking.place.price}

        //                 <h2 className="font-bold">
        //                     Maximum No of Guests Allowed:{" "}
        //                 </h2>
        //                 {booking.place?.maxguest !== undefined && booking.place?.maxguest !== null
        //                     ? booking.place.maxguest
        //                     : "Not Provided"}

        //                 <div className="mt-2 font-semibold">
        //                     Perks:
        //                     {booking.place.perks ? (
        //                         <ul className="list-disc pl-5 mt-2">
        //                             {booking.place?.perks.map((perk, index) => (
        //                                 <li key={index} className="mb-1">
        //                                     {perk}
        //                                 </li>
        //                             ))}
        //                         </ul>
        //                     ) : (
        //                         "Not Provided"
        //                     )}
        //                 </div>
        //                 <div className="mr-4">
        //                     <span className="font-bold text-xl">
        //                         Extra Information:
        //                     </span>
        //                     <h2>
        //                         {booking.place?.extrainfo ? booking.place?.extrainfo : "Not Provided"}
        //                     </h2>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="text-center mt-4">
        //             <button
        //                 onClick={handleDelete}
        //                 className="bg-red-500 mb-2 py-2 px-4 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition duration-300 ml-2"
        //                 type="button"
        //             >
        //                 Delete Booking
        //             </button>
        //         </div>
        //     </div>
        // </div>

        <div>
            <div className='mb-4'>
                <PlaceNavbar />
            </div>
            <div className="max-w-screen-lg mx-auto p-4 mt-4 bg-blue-100 mx-8 px-8 py-4">
                <h1 className="text-3xl">{booking.place?.title}</h1>
                <a
                    href={"https://maps.google.com/?q=" + booking.place?.address}
                    className="my-2 flex gap-1 font-semibold underline italic text-black"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                    </svg>
                    {booking.place?.address}
                </a>
                <div className="max-w-screen-lg mx-auto p-4">
                    <div className="grid gap-2 grid-cols-[2fr_1fr]">
                        <div className="aspect-w-1 aspect-h-1">
                            {booking.place?.photos?.[0] && (
                                <img
                                    src={`${baseUrl}/uploads/` + booking.place.photos[0]}
                                    alt="no_image_provided"
                                    className="w-full h-full object-cover rounded-2xl cursor-pointer"
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="aspect-w-1 aspect-h-1">
                                {booking.place?.photos?.[1] && (
                                    <img
                                        src={`${baseUrl}/uploads/` + booking.place.photos[1]}
                                        alt="no_image_provided"
                                        className="w-full h-full object-cover rounded-2xl cursor-pointer"
                                    />
                                )}
                            </div>
                            <div className="aspect-w-1 aspect-h-1">
                                {booking.place?.photos?.[2] && (
                                    <img
                                        src={`${baseUrl}/uploads/` + booking.place.photos[2]}
                                        alt="no_image_provided"
                                        className="w-full h-full object-cover rounded-2xl cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl mb-1 font-bold">Description:</h2>
                    {booking.place?.description}
                </div>
                <div className="flex items-center grid grid-cols-[2fr_1fr] mt-4">
                    <div>
                        <table className="table-auto border-collapse border border-black w-2/3 mx-auto">
                            <thead>
                                <tr>
                                    <th className="border border-black px-4 py-2">Detail</th>
                                    <th className="border border-black px-4 py-2">Information</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black px-4 py-2">Name of Guest</td>
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

                    <div>
                        <h2 className="font-bold">
                            Price per Night:
                        </h2>
                        {"$ " + booking.place?.price}

                        <h2 className="font-bold mt-2">
                            Maximum No of Guests Allowed:
                        </h2>
                        {booking.place?.maxguest !== undefined && booking.place?.maxguest !== null
                            ? booking.place.maxguest
                            : "Not Provided"}

                        <div className="mt-2 font-semibold">
                            Perks:
                            {booking.place?.perks ? (
                                <ul className="list-disc pl-5 mt-2">
                                    {booking.place.perks.map((perk, index) => (
                                        <li key={index} className="mb-1">
                                            {perk}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                "Not Provided"
                            )}
                        </div>
                        <div className="mt-2">
                            <span className="font-bold text-xl">
                                Extra Information:
                            </span>
                            <h2>
                                {booking.place?.extrainfo ? booking.place.extrainfo : "Not Provided"}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 mb-2 py-2 px-4 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition duration-300"
                        type="button"
                    >
                        Delete Booking
                    </button>
                </div>
            </div>
        </div>
    );
}
