const { create, getById, update } = require('../services/hotelService');
const { parseError } = require('../util/parser');

const hotelController = require('express').Router();

hotelController.get('/:id/details', async (req, res) => {
    const hotel = await getById(req.params.id);

    if (hotel.owner == req.user._id) {
        hotel.isOwner = true;
    };

    res.render('details', {
        title: 'Hotel Details',
        hotel         // add context to the template
    });
});

hotelController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Hotel'
    });
});

hotelController.post('/create', async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        owner: req.user._id
    };

    try {
        if (Object.values(hotel).some(v => !v)) {
            throw new Error('All fields are required');
        }
        await create(hotel);
        res.redirect('/');
    } catch (err) {
        res.render('create', {
            title: 'Create Hotel',
            body: hotel,
            errors: parseError(err)
        })
    }
});

hotelController.get('/:id/edit', async (req, res) => {
    const hotel = await getById(req.params.id);
    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    };


    res.render('edit', {
        title: 'Edit Hotel',
        hotel   // add context to the template
    });
});

hotelController.post('/:id/edit', async (req, res) => {
    const hotel = await getById(req.params.id);
    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    };
    const edited = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        // owner: req.user._id
    };

    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are required');
        }
        await update(req.params.id, edited);
        res.redirect(`/hotel/${req.params.id}/details`);
    } catch (err) {
        res.render('edit', {
            title: 'Edit Hotel',
            hotel: Object.assign(edited, { _id: req.params.id }),
            errors: parseError(err)
        })
    }
});



module.exports = hotelController;