// giftlink-backend/models/db.js
const { MongoClient } = require('mongodb');

// Si MONGO_URL nan .env la pa definisman byen, n ap itilize 'mongodb://localhost:27017'
const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = "giftDB";

let dbInstance = null;

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }

    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log("Koneksyon ak MongoDB reyisi!");
        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (error) {
        console.error("Erè koneksyon ak MongoDB:", error);
        throw error;
    }
}

module.exports = connectToDatabase;