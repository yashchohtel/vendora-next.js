import mongoose from "mongoose";

// get the MongoDB connection URL from environment variables
const mongoDbUrl = process.env.MONGODB_URI

// check if the MongoDB connection URL is defined, if not throw an error
if (!mongoDbUrl) {
    throw new Error("DB Error")
}

// cache the connection and promise to avoid multiple connections
let cached = global.mongoose

// if the cache is not defined, initialize it with null values
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

// function to connect to the MongoDB database
const connectDb = async () => {

    // if the connection is already established, return it
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(mongoDbUrl).then((conn) => conn.connection)
    }

    try {
        const conn = await cached.promise;
        return conn;
    } catch (error) {
        cached.promise = null; // failed promise reset
        throw error; // error ko aage bhejo
    }

}

export default connectDb;