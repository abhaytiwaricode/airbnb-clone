import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery.jsx';
import AddressLink from '../AddressLink.jsx';

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return null;

    return (
        <>
            <div className="open-sans px-6 py-6 mx-auto max-w-screen-lg bg-gray-50">
                <h1 className="md:text-3xl text-xl font-semibold">
                    {place.title}
                </h1>
                <AddressLink>{place.address}</AddressLink>
                <PlaceGallery place={place} />
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div>
                            <h2 className="font-semibold text-xl mt-3">
                                Description
                            </h2>
                            <p className="text-md py-1">{place.description}</p>
                        </div>
                        <div className="text-md">
                            <p>
                                Check-In: {place.checkIn}
                            </p>
                            <p>
                                Check-Out: {place.checkOut}
                            </p>
                            <p>
                                Max number of guests: {place.maxGuests}
                            </p>
                        </div>
                    </div>
                    <BookingWidget place={place} />
                </div>
                <div className="mt-3">
                    <h2 className="font-semibold text-xl">Extra Info</h2>
                    <p className="text-md py-2">{place.extraInfo}</p>
                </div>
            </div>
        </>
    );
}
