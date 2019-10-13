const express = require('express');
const app = express();
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const post = require('./routes/api/post');
const profiles = require('./routes/api/profiles');

//DB config

const db = require('./config/keys').mongoURI;

//connect to mongoDB through mongoose

mongoose
    .connect(db)
    .then(() => {
        console.log(' Hey Ashique MOngoDB connected')
    })
    .catch((err) => {
        console.log(err)
    });
app.get('/', (req,res) =>{
    res.send('Hello rwetewg!')
})

app.use('/api/users/',users)
app.use('/api/profiles/',profiles)
app.use('/api/post/',post)

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
})