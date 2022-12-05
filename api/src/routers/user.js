const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken(); // .generateAuthToken() is custom function using jwt and it's defined in model. Token will be stored to the user
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({ error });
    }
});

module.exports = router;
