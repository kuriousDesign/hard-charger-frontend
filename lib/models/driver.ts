// import { Schema, model, models } from 'mongoose';

// const DriverSchema = new Schema({
//   last_name: { type: Text, required: true },
//   first_name: { type: Text, required: true },
//   suffix: { type: Text, required: true },
//   car_number: { type: Text, required: true },
// });


// export default models.Driver || model('Driver', DriverSchema);


import mongoose from 'mongoose'


const driverSchema = new mongoose.Schema({
  last_name: { type: String, required: true },
  first_name: { type: String, required: true },
  suffix: { type: String, required: true },
  car_number: { type: String, required: true },
});

export default mongoose.models.Driver || mongoose.model('Driver', driverSchema)