/*jshint esversion: 8 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger');
const pinoHttp = require('pino-http');

const connectToDatabase = require('./models/db');
const { loadData } = require("./util/import-mongo/index");

// Gift API Task 1: Import giftRoutes
const giftroutes = require('./routes/giftRoutes');

// Search API Task 1: Import searchRoutes (pou lè w rive nan modil search la)
// const searchRoutes = require('./routes/searchRoutes');

const app = express();

// Middlewares
app.use("*", cors());
app.use(express.json());
app.use(pinoHttp({ logger: pinoLogger }));

const port = 3060;

// Connect to MongoDB; we just do this one time
connectToDatabase().then(() => {
    pinoLogger.info('Connected to DB');
}).catch((e) => console.error('Failed to connect to DB', e));

// Gift API Task 2: Add giftRoutes to the server
app.use('/api/gifts', giftroutes);

// Search API Task 2: Add searchRoutes to the server (lè w va bezwen l)
// app.use('/api/search', searchRoutes);

// Root Endpoint
app.get("/", (req, res) => {
    res.send("Inside the server");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;