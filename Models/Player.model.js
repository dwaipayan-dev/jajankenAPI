const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    Name:{
        type: String,
        unique: true,
        required: true,
    },
    State:{
        type: Object
    }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;

