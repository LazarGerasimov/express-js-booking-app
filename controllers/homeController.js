const homeController = require('express').Router();

//TODO replace with assignment
homeController.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        user: req.user
    });
})

module.exports = homeController;