const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Blog, validate } = require('../models/blog');


//Create a blog
route.post('/', [auth, admin], async (req, res) => {
    const result = validate(req.body);
    if (!result)
        return res.status(400).send(result.error.details[0].message);


    const blog = new Blog({
        heading: req.body.heading,
        author: req.body.author,
        date: req.body.date,
        content: req.body.content
    });

    try {
        await blog.save();
        const { _id, heading, author, date, content } = blog;
        res.status(200).json({
            blog: { _id, heading, author, date, content }
        });
    }
    catch (err) {
        for (field in err.errors) {
            res.status(400).send(err.errors[field].message);
        }
    }
});


//Read the whole blogs
route.get('/', auth, async (req, res) => {
    const blogs = await Blog.find().sort({heading:-1});
    res.status(200).json({blogs});
});


//Delete a blog
route.delete('/:id', [auth, admin], async (req, res) => {
    //check existence
    const blog = await Blog.findByIdAndRemove(req.params.id);
    if (!blog)    //if not found
        return res.status(404).send('The Blog was unavailable.');

    //if exists

    //send the deleted blog
    res.send(blog);
});


route.put('/:id/like/:userid', auth, async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.params.userid } }, { new: true });
    
    if(!blog)    //if not found
    return res.status(404).send('The Blog was unavailable.');

    //show the updated blog
    res.status(200).json({blog});
})


route.put('/:id/unlike/:userid', auth, async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, { $pull: { likes: req.params.userid } }, { new: true });
    
    if(!blog)    //if not found
    return res.status(404).send('The Blog was unavailable.');

    //show the updated blog
    res.status(200).json({blog});
})

module.exports = route;