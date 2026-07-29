const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Étape 2: Get all gifts (/api/gifts)
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (e) {
        console.error('Erè nan rekirasyon kado yo:', e);
        res.status(500).send('Erè nan sèvè a');
    }
});

// Étape 3: Get a specific gift by ID (/api/gifts/:id)
router.get('/:id', async (req, res) => {
    try {
        // Tâche 1: Connectez-vous à MongoDB
        const db = await connectToDatabase();

        // Tâche 2: Utilisez la méthode collection()
        const collection = db.collection("gifts");

        const id = req.params.id;

        // Tâche 3: Trouvez un cadeau spécifique par ID
        const gift = await collection.findOne({ id: id });

        if (!gift) {
            return res.status(404).send("Kado sa a pa jwenn");
        }

        res.json(gift);
    } catch (e) {
        console.error('Erè nan rekirasyon kado a:', e);
        res.status(500).send('Erè nan sèvè a');
    }
});

module.exports = router;