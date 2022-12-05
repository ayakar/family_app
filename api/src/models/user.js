const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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
        tokens: [{ token: { type: String, required: true } }],
    },
    {
        timestamps: true,
    }
);

// Used in create user, create
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    // sign() takes two args: data to include into the token and secret
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = [...user.tokens, { token }];
    await user.save();
    return token;
};

// TODO: hash password, set unique email message in .pre save middleware
userSchema.pre('save', async function (next) {
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
