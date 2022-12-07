const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const FamilyGroup = require('../models/familyGroup');
const User = require('../models/user');

router.post('/familyGroups', auth, async (req, res) => {
    try {
        const familyGroup = new FamilyGroup({ ...req.body, owner: req.user._id, members: [{ member: req.user._id }] });
        const result = await familyGroup.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/familyGroups/:id', auth, async (req, res) => {
    try {
        const familyGroup = await FamilyGroup.findOne({ _id: req.params.id, 'members.member': req.user._id });
        if (!familyGroup) {
            res.status(404).send({ error: 'Family Group Not Found' });
        }
        res.send(familyGroup);
    } catch (error) {
        res.status(500).send();
    }
});

router.patch('/familyGroups/:id', auth, async (req, res) => {
    const allowedProperties = ['name', 'member'];
    const requestedProperties = Object.keys(req.body);

    const isValid = requestedProperties.every((property) => allowedProperties.includes(property));

    if (!isValid) {
        res.status(400).send({ error: 'Update Not Allow' });
    }

    try {
        const familyGroup = await FamilyGroup.findOne({ _id: req.params.id, 'members.member': req.user._id });
        if (!familyGroup) {
            res.status(404).send({ error: 'Family Group Not Found' });
        }

        requestedProperties.forEach((property) => {
            if (property === 'member') {
                const newMember = { member: new mongoose.mongo.ObjectId(req.body['member']) };
                familyGroup['members'] = [...familyGroup['members'], newMember];
            } else {
                familyGroup[property] = req.body[property];
            }
        });
        await familyGroup.save();
        res.send(familyGroup);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
