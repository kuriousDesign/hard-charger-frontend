import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI as string;
const DB_NAME = 'games_2025';

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    // Already connected
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}