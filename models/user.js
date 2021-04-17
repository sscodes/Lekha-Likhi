const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 1024
    },
    role: {
        type: String,
        enum:['user', 'admin'],
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
    }
});

//adding a method in user schema object to create a token with the payload
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role }, config.get('jwtPrivateKey'));
    return token;
}


const User = mongoose.model('User', userSchema);

function validate(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(10).max(100).required().email(),
        password: Joi.string().min(7).max(100).required(),
        role: Joi.string().required(),
        contactNumber: Joi.string().required()
    })
    return schema.validate(user);
}

module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.validate = validate;