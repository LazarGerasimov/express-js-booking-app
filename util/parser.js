function parseError(error) {
    if (error.name == 'ValidationError') {  // mongoose validation error
        return Object.values(error.errors).map(v => v.message);
    } else {
        return error.message.split('\n'); // user error
    }
}

module.exports = {
    parseError
}