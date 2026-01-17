const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        if (error.name === 'MongooseServerSelectionError') {
            console.error("\n[CRITICAL] Could not connect to MongoDB. This is likely due to your IP address not being whitelisted.");
            console.error("Please go to MongoDB Atlas -> Network Access -> Add IP Address -> Allow Access from Anywhere (0.0.0.0/0).\n");
        }
        process.exit(1);
    }
};

module.exports = connectToMongo;
