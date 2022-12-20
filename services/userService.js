const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'The most secret secret';

//TODO replace with assignment (email if needed);
async function register(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Username is taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10); // salt as second param
    const user = await User.create({
        username,
        hashedPassword
    });
    //TODO check if registration creates user session
    return createSession(user);

}

//TODO replace with asignment (email if needed);
async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect username or password');
    };
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!hasMatch == false) {
        throw new Error('Incorrect username or password');
    }
    return createSession(user);

}
//TODO check assingment 
function createSession(user) {   // create payload for cookie or has to manually log in
    const payload = {
        _id: user._id,
        username: user.username,
    };
    return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}


module.exports = {
    register,
    login,
    verifyToken
}