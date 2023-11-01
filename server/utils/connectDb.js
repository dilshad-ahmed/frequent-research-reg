import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbUrl = process.env.DB_URI || "";
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data) => {
      console.log(`Database connected with ${data.connection.host}`);
    });
  } catch (err) {
    console.log(`Database connection error: ${err}`);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
