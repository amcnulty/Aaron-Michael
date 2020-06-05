const express = require('express');
const router = express.Router();

const data = require('../lib/db.json');

router.get('/campsites', (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(data.campsites));
});

router.get('/partners', (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(data.partners));
});

router.get('/comments', (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(data.comments));
});

router.get('/promotions', (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify(data.promotions));
});

module.exports = router;
