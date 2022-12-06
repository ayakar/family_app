const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const FamilyGroup = require('../models/familyGroup');
const User = require('../models/user');

router.post('/familyGroups', auth, async (req, res) => {
    try {
        const familyGroup = new FamilyGroup({ ...req.body, owner: req.user._id });
        const result = await familyGroup.save();
        res.send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
