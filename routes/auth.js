// LOGIN

const Joi = require('joi');
const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

route.post('/', async (req, res) => {
    const result = validate(req.body);
    if (!result)
        return res.status(400).json({error: result.error.details[0].message});

    let userSearch = await User.findOne({ email: req.body.email });
    if(!userSearch)
        return res.status(400).json({error: 'Invalid email or password...'});

    const validPassword = await bcrypt.compare(req.body.password, userSearch.password);
    if(!validPassword)
        return res.status(400).json({error: 'Invalid email or password...'});

    const user = await User.findOne({ email: req.body.email });

    const token = userSearch.generateAuthToken();
    const { _id, name, email, role, contactNumber } = user;
    res.status(200).json({
        token,
        user: { _id, name, email, role, contactNumber }
      });;
});

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(10).max(100).required().email(),
        password: Joi.string().min(7).max(100).required()
    })
    return schema.validate(user);
}

module.exports = route;