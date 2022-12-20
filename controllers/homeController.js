const { getAll } = require('../services/hotelService');

const homeController = require('express').Router();

//TODO replace with assignment
homeController.get('/', async (req, res) => {
    const hotels = await getAll();
    res.render('home', {
        title: 'Home',
        // user: req.user,
        hotels
    });
});


module.exports = homeController;