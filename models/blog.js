const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');

const blogSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    author: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100
    },
    date: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});


const Blog = mongoose.model('Blog', blogSchema);

function validate(blog) {
    const schema = Joi.object({
        heading: Joi.string().min(3).max(100).required(),
        author: Joi.string().max(100).required(),
        date: Joi.string().required(),
        content: Joi.string().required()
    })
    return schema.validate(blog);
}

module.exports.blogSchema = blogSchema;
module.exports.Blog = Blog;
module.exports.validate = validate;
