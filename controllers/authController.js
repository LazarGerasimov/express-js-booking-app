const validator = require('validator');
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    //TODO replace with actual view
    res.render('register', {  //view + options
        title: 'Register Page'
    });
});

authController.post('/register', async (req, res) => {
    try {
        // console.log(req.body);
        if (validator.isEmail(req.body.email) == false) {       // npm i validator // check asignment for email
            throw new Error('Invalid email');
        }
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required');
        }
        if (req.body.password !== req.body.repass) {
            throw new Error('Passwords do not match');
        }
        if (req.body.password.length < 5) {
            throw new Error('Password must be at least 5 characters long');
        }
        const token = await register(req.body.email, req.body.username, req.body.password); // TODO check asignment
        res.cookie('token', token);
        res.redirect('/'); //TODO check asignment routing
    } catch (error) {
        // console.log(error);              // reveal if needed
        const errors = parseError(error); //split error
        //TODO add actual error display
        res.render('register', {  // render page + error
            title: 'Register Page',
            errors,
            body: {
                email: req.body.email, 
                username: req.body.username
            }
        });
    }

});

authController.get('/login', (req, res) => {  // render view 
    res.render('login', {
        title: 'Login Page'
    });
});

authController.post('/login', async (req, res) => { // send req to db
    try {
        const token = await login(req.body.email, req.body.password);
        res.cookie('token', token);
        res.redirect('/'); //TODO check with asignment routing
    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            title: 'Login',
            errors,
            body: {
                email: req.body.email
            }
        });
    };
}); 

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})


module.exports = authController;