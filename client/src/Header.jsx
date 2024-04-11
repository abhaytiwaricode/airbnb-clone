import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext.jsx';
import airbnbImage from './assets/airbnb.svg';

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="open-sans flex justify-between text-center items-center px-4 lg:px-6 py-4 lg:py-4 border-b border-gray-300 -mt-2">
      <div className="flex items-center gap-1 text-primary">
        <Link to={'/'}>
          <img src={airbnbImage} alt="Airbnb" className="-m-1 p-1" />
        </Link>
      </div>
      <div className="gap-4 border border-gray-300 rounded-full shadow-md shadow-gray-200 py-3 px-6 items-center sm:inline-flex hidden">
        <div className="text-sm font-semibold">Anywhere</div>
        <div className="border-l border-gray-300 h-6"></div>
        <div className="text-sm font-semibold">Any week</div>
        <div className="border-l border-gray-300 h-6"></div>
        <div className="text-sm font-semibold">Add guests</div>
        <button className="bg-primary text-white p-2 rounded-full">
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
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      <div className="border border-gray-300 rounded-full ms-2 py-3 px-4">
        <Link
          to={user ? '/account' : '/login'}
          className="flex items-center gap-2 font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {!!user && <div className="text-sm hidden sm:block font-semibold">{user.name}</div>}
        </Link>
      </div>
    </header>
  );
}
