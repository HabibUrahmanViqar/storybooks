const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firsName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    image: {
        type: String,
    }
});

// Creating collection and add schema
mongoose.model('users', UserSchema);