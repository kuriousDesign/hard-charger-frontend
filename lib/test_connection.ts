
import mongoose from 'mongoose';

const clientOptions = { serverApi: { version: '1' as '1', strict: true, deprecationErrors: true } };

export default async function runConnectionTest() {
  try {
    console.log("Attempting to connect to MongoDB: ", process.env.NEXT_PUBLIC_MONGO_URI);
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI || '', clientOptions);
    //await mongoose.connection.db.games_2025().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await mongoose.disconnect();
  }
}
//run().catch(console.dir);
