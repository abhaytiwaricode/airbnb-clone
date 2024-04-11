import AddressLink from "../AddressLink.jsx";
import BookingDates from "../BookingDates.jsx";
import PlaceGallery from "../PlaceGallery.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function BookingPage() {
    const {id} = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    return (
        <>
            <div className="my-8 mx-auto lg:w-[80%] md:w-[90%]">
                <div className="bg-gray-100 p-4 rounded-2xl">
                    <h1 className="text-3xl">{booking.place.title}</h1>
                    <AddressLink>{booking.place.address}</AddressLink>
                </div>
                <div
                    className="bg-gray-100 p-6 my-2 rounded-2xl flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:mr-6 mb-6 lg:mb-0">
                        <h2 className="text-2xl mb-4">Your booking information:</h2>
                        <BookingDates booking={booking}/>
                    </div>
                    <div
                        className="bg-primary p-4 text-white rounded-xl flex justify-center items-center lg:flex-col lg:justify-start">
                        <div className="lg:text-xl text-md">Total price</div>
                        <div className="text-lg">${booking.price}</div>
                    </div>
                </div>

                <PlaceGallery place={booking.place}/>
            </div>

        </>
    );
}
