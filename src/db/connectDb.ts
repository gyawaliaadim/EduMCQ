
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const URI = process.env.MONGODB_URI?.toString();
        const conn = await mongoose.connect(URI ? URI : "", {});
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;

    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDb;