import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_URL);

    console.log(
      `Server running on Port : ${connect.connections.host}`.cyan.underline
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};