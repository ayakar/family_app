const mongoose = require('mongoose');

const familyGroupSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },

        // Currently not used
        // owner: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'User',
        // },

        members: [
            {
                member: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'User',
                },
            },
        ],
    },
    { timestamps: true }
);

const FamilyGroup = mongoose.model('FamilyGroup', familyGroupSchema);
module.exports = FamilyGroup;
