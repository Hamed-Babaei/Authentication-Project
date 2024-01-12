import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    } else {
      await mongoose.connect("mongodb://127.0.0.1/next-auth");
      console.log("Connect To Database Successfully");
    }
  } catch (error) {
    console.log("Database Connection has error", error);
  }
};

export default connectToDB;
