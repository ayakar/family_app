const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: [true, 'email must be unique'],
            lowercase: true,
            validate(emailValue) {
                if (!validator.isEmail(emailValue)) {
                    throw new Error('Email is invalid');
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate(passwordValue) {
                if (passwordValue.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain password');
                }
                if (!validator.isStrongPassword(passwordValue)) {
                    throw new Error('Password need to be minimum 10 character and contains at least 1 lower character, uppercase, symbol'); // TODO: customize this
                }
            },
        },
        role: { type: String, enum: ['admin', 'subscriber'] },
        // roles: [
        //     {
        //         familyId: { type: mongoose.Schema.Types.ObjectId },
        //         role: { type: String, enum: ['admin', 'subscriber'] },
        //     },
        // ],
        tokens: [{ token: { type: String, required: true } }],
    },
    {
        timestamps: true,
    }
);

// Currently not used
// userSchema.virtual('ownedFamilyGroups', {
//     ref: 'FamilyGroup',
//     localField: '_id',
//     foreignField: 'owner',
// });

userSchema.virtual('familyGroups', {
    ref: 'FamilyGroup',
    localField: '_id',
    foreignField: 'members',
});

// Used in create user, create
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    // sign() takes two args: data to include into the token and secret
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = [...user.tokens, { token }];
    await user.save();
    return token;
};

// userSchema.methods.toJSON = function () {
//     console.log('test');
// };

//
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Unable to login');
    }
    return user;
};

// Middleware which is called before saving user
// TODO: set unique email message in .pre save middleware
userSchema.pre('save', async function (next) {
    const user = this;
    // check if password is modified by isModified method in mongoose. If so, hash it.
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
