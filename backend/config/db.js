import mongoose from "mongoose";

const connectDb = async () => {
    console.log("Attempting MongoDB connection with URI:", process.env.MONGO_URI);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDb;