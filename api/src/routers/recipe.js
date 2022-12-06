const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const Recipe = require('../models/recipe');

router.post('/recipes', auth, async (req, res) => {
    res.send('recipe created');
});

module.exports = router;
