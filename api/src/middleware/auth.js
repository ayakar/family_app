const jwt = require('jsonwebtoken');
const User = require('../models/user');

// auth method is for:
// - validate Authorization header by compare the value with token in DB.
// - storing token and user in req.token/ req.user to make them accessible globally
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // decoding token to ensure token exist and not expire on the server. Id will be accessible in decoded.
        const user = await User.findOne({ id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please login' });
    }
};

module.exports = auth;
