const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // mongoose 7 new req

//TODO change db according to assignment
const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/scaffoldDb4'


module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
        
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }

}