const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    //TODO add User validation per asignment
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, match: [/^[a-zA-Z0-9]+$/i, 'Username may only contain english letters and numbers'] },
    hashedPassword: { type: String, required: true }
});

userSchema.index({ username: 1 }, {  // allows setting unique in the Schema
    collation: {
        locale: 'en',
        strength: 2
    }
});

userSchema.index({ email: 1 }, {  // allows setting unique in the Schema
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;