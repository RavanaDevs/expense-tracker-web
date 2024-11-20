"use server";
import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

let isConnected = false; // Track the connection status.

export async function connectToDatabase() {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return mongoose.connection;
  }

  try {
    const db = await mongoose.connect(uri);

    isConnected = true;
    console.log("=> New database connection established");
    return db;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
