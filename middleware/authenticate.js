const mongoose = require('mongoose')
const {jwt_secret} = require('../key')
const jwt = require('jsonwebtoken')
const {User} = require('../database/model')

const authenticate = (req, res, next)=>{
    const {authorization} = req.headers;
    if(!authorization){
       return res.status(401).json({
            error:"Please first login to Post"
        })
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, jwt_secret, (err, payload)=>{
        if(err){
            return res.status(401).json({
                error:"Please first login to Post"
            })
        }
        const {_id} = payload
        User.findById(_id).then(userData=>{
            // console.log(userData)
            // res.send('userfinded')
            req.user = userData
            next()

        })
    })
}

module.exports = authenticate;