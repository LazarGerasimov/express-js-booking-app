const { Schema, model, Types } = require('mongoose');

const hotelSchema = new Schema({
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    imageUrl: { type: String, required: true },
    rooms: { type: Number, required: true, min: [1, 'Rooms must be between 1 and 100'], max: [100, 'Rooms must be between 1 and 100'] },
    bookings: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User', required: true }
});


hotelSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const Hotel = model('Hotel', hotelSchema);

module.exports = Hotel;