import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/accio';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to MongoDB at ${uri}. Running with in-memory persistence fallback.`);
  }

  mongoose.connection.on('error', (err) => {
    console.error(`[Database Error] ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[Database] Disconnected from MongoDB');
  });
};

export const isDbConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};
