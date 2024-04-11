import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImage from "../PlaceImage.jsx";
import {Link} from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    }, []);
    return (
        <div>
        <AccountNav/>
        <div className="mx-auto lg:w-[80%] md:w-[95%] sm:w-full">
            {bookings?.length > 0 && bookings.map(booking => (
                <Link
                    to={`/account/bookings/${booking._id}`}
                    className="flex flex-col sm:flex-row gap-1 bg-gray-200 rounded-2xl overflow-hidden mt-4 lg:gap-4 md:gap-4">
                    <div className="w-full sm:w-48 h-40">
                        <PlaceImage place={booking.place} className="h-full w-full object-cover aspect-square" />
                    </div>
                    <div className="flex flex-col justify-between py-3 px-3 sm:px-0">
                        <div>
                            <h2 className="text-lg sm:text-2xl font-semibold mr-1">{booking.place.title}</h2>
                            <div className="text-sm sm:text-md">
                                <BookingDates booking={booking} className="mb-2 mt-3 text-gray-500" />
                                <div className="flex gap-1 items-center sm:mt-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 sm:w-6 sm:h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                                        />
                                    </svg>
                                    <span className="lg:text-lg sm:text-md">Total price: ${booking.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>);
}