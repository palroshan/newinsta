const express = require('express')
const mongoose = require('mongoose')
const userController = require('./controller/user.controller')
const {mongoUrl} = require('./key')
const cors = require('cors')
const postController = require('./controller/createpost')
const router = require("./controller/user")
const followController = require("./controller/follow")
const path = require('path')

const app = express();
const PORT = process.env.port || 5000;
app.use(cors())
app.use(express.json())
app.use(userController)
app.use(postController)
app.use(router)
app.use(followController)

mongoose.set('strictQuery', false);

mongoose.connect(mongoUrl).then(()=>{
    console.log("database is connected")
})

// Serving the frontend
app.use(express.static(path.join(__dirname, "./client/build/")))

app.get("*", (req, res)=>{
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})
app.listen(PORT, ()=>{
    console.log("Server is started");
});