import mongoose from "mongoose";

/**
 * Connect to MongoDB
 *
 * @function connectDB
 * @returns {undefined}
 * @throws {Error} - If there is an error connecting to the database
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
