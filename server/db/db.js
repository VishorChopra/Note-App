import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Note_apptask");
    console.log("Connect to MongoDB");
  } catch (error) {
    console.log("Error connection to MongoDB", error.message);
  }
};

export default connectToMongoDB;
