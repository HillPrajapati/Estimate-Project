// backend/routes/estimate.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../data/Estimate_detail.json');
  fs.readFile(filePath, 'utf8', (err, jsonData) => {
    if (err) return res.status(500).send({ error: 'Could not read estimate data' });

    res.json(JSON.parse(jsonData))
  });
});

module.exports = router;

