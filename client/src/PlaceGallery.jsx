import PlaceImage from "./PlaceImage.jsx";
import {useState} from "react";

export default function PlaceGallery({place}) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-white min-h-screen">
                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <h2 className="text-2xl font-semibold lg:text-3xl">
                        Additional Photos
                    </h2>
                    <div>
                        <button
                            onClick={() => setShowAllPhotos(false)}
                            className="fixed right-12 top-8 bg-white py-2 px-2 rounded-xl border border-gray-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    {place?.photos?.length > 0 &&
                        place.photos.map((photo, index) => (
                            <div key={index}>
                                <img
                                    className="w-full h-[20rem] md:h-auto lg:h-[400px] object-cover rounded-xl"
                                    src={'http://localhost:4000/uploads/' + photo}
                                    alt="Place_Image"
                                />
                            </div>
                        ))}
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden lg:h-[410px]">
                    <div>
                        <PlaceImage place={place}/>
                    </div>
                    <div className="grid">
                        {place.photos?.[1] && (
                            <img
                                onClick={() => setShowAllPhotos(true)}
                                className="aspect-square cursor-pointer object-cover lg:h-[210px] w-full"
                                src={'http://localhost:4000/uploads/' + place.photos[1]}
                                alt=""
                            />
                        )}
                        <div className="overflow-hidden">
                            {place.photos?.[2] && (
                                <img
                                    onClick={() => setShowAllPhotos(true)}
                                    className="aspect-square cursor-pointer object-cover relative top-2 lg:h-[200px] w-full"
                                    src={'http://localhost:4000/uploads/' + place.photos[2]}
                                    alt=""
                                />
                            )}
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setShowAllPhotos(true)}
                    className="gap-1 absolute bottom-2 right-2 py-1 px-2 text-sm bg-white rounded-xl shadow-md shadow-gray-500 sm:flex hidden"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Show all
                </button>
            </div>
            <button
                onClick={() => setShowAllPhotos(true)}
                className="flex gap-1 mt-2 py-1 px-2 text-sm bg-gray-200 text-black rounded-xl lg:hidden md:hidden"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                        clipRule="evenodd"
                    />
                </svg>
                Show all
            </button>
        </>
    );
}