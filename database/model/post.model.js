const mongoose = require('mongoose')
const postSchema = require('../schema/post.schema')

const POST = mongoose.model('POST', postSchema)

module.exports = POST;