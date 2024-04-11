const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  address: { type: String, required: true },
  photos: { type: [String], default: [] },
  description: { type: String, required: true },
  perks: { type: [String], default: [] },
  extraInfo: { type: String, default: '' },
  checkIn: { type: Date, default: '' },
  checkOut: { type: Date, default: '' },
  maxGuests: { type: Number, default: 0 },
  price: { type: Number, default: 100 },
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;
