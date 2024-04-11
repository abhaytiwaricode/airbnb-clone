import PhotosUploader from '../PhotosUploader.jsx';
import Perks from '../Perks.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AccountNav from '../AccountNav.jsx';
import { Navigate, useParams } from 'react-router-dom';

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-xl font-bold mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(event) {
    event.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // update
      await axios.put(`/places/${id}`, placeData);
      setRedirect(true);
    } else {
      // new place
      await axios.post('/places', placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  return (
    <div className="open-sans lg:px-12 md:px-8 sm:px-4">
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          'Title',
          'Title for your place. Should be short and catchy as in an advertisement'
        )}
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title, for example: My Sweet House"
          required
        />
        {preInput('Address', 'Address to this place')}
        <input
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Address"
          required
        />
        {preInput('Photos', 'More = Better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description', 'Description of the place')}
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        {preInput('Perks', 'Select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('Extra Info', 'House rules, etc')}
        <textarea
          value={extraInfo}
          onChange={(event) => setExtraInfo(event.target.value)}
          required
        />
        {preInput(
          'Check in&out times',
          'Add check in and out times, remember to have some time window for cleaning the room between guests'
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4 mb-3">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="time"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
              required
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="time"
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
              required
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max no. of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(event) => setMaxGuests(event.target.value)}
              required
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
