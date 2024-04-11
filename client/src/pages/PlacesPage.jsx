import { Link } from "react-router-dom";
import AccountNav from "../AccountNav.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get('/user-places');
                setPlaces(response.data);
            } catch (error) {
                // Handle error
                console.error('Error fetching places:', error);
            }
        };

        fetchPlaces();
    }, []);

    return (
        <div className="open-sans container mx-auto">
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to="/account/places/new">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' + place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl" key={place.title}>
                        <div className="flex w-32 h-32 bg-gray-300 flex-grow-0 flex-shrink-0">
                            {place.photos.length > 0 && (
                                <img className="object-cover h-32 w-full" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="Place Image" />
                            )}
                        </div>
                        <div className="flex-grow flex-shrink">
                            <h2 className="text-xl">{place.title.toUpperCase()}</h2>
                            <p className="text-sm mt-2 line-clamp-3">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
