import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/noteapp";

let isConnected = false;

async function connectDB() {
    if (isConnected) {
    console.log("Already connected to MongoDB");
    }
  try {
    const db = await mongoose.connect(mongoURI);
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB:", db.connection.name);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

export default connectDB;
