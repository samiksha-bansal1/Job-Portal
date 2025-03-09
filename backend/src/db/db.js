
import dotenv from "dotenv";
import  mongoose from "mongoose";
dotenv.config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;