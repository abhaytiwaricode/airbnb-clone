import {useContext, useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "./UserContext.jsx";

export default function BookingWidget({place}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {
        const response = await axios.post('/bookings', {
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            place: place._id,
            price: numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="mt-4 bg-white shadow shadow-gray-300 p-4 rounded-2xl">
            <div className="text-2xl text-center sm:text-lg font-semibold">
                Price: ${place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row">
                    <div className="py-3 px-4">
                        <label>Check in:</label>
                        <input
                            type="date"
                            className="w-full sm:text-sm"
                            value={checkIn}
                            onChange={(event) => setCheckIn(event.target.value)}
                            required
                        />
                    </div>
                    <div className="py-3 px-4 sm:border-l">
                        <label>Check out:</label>
                        <input
                            type="date"
                            className="w-full sm:text-sm"
                            value={checkOut}
                            onChange={(event) => setCheckOut(event.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="py-3 px-4 border-t sm:border-t">
                    <label>Number of guests:</label>
                    <input
                        type="number"
                        className="w-full"
                        placeholder="1"
                        value={numberOfGuests}
                        onChange={(event) => setNumberOfGuests(event.target.value)}
                        required
                    />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t sm:border-t">
                        <label>Your full name:</label>
                        <input
                            type="text"
                            className="w-full"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                        <label>Phone number:</label>
                        <input
                            type="tel"
                            className="w-full"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                        />
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="primary mt-4 w-full font-semibold">
                Book this place
                {numberOfNights > 0 && (
                    <span>&nbsp;${numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    );
}
