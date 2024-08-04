import mongoose from 'mongoose';

async function initMongoConnection() {
  try {
    const DB_URI = process.env.MONGODB_URL;
    await mongoose.conect(DB_URI);

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { initMongoConnection };
