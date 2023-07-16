const {Schema} = require('mongoose');
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    username: {
        unique: true,
        type: String,
        required:true       
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    Photo:{
        type: String
    },
    followers: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: ObjectId,
            ref: "User"
        }
    ]
})

module.exports = userSchema;