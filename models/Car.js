import mongoose from 'mongoose';

const CarSchema = mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  vin: {
    type: String,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  mileage: {
    type: Number,
  },
  year: {
    type: Number,
  },
  price: {
    type: Number,
  },
  zipCode: {
    type: String,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Cars', CarSchema);