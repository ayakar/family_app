const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/recipes', auth, async (req, res) => {
    res.send('recipe created');
});

module.exports = router;
