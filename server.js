const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const post = require('./routes/api/post');
const profiles = require('./routes/api/profiles');
const passport = require('passport');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

//passport middleware 
app.use(passport.initialize());

//passport config

require('./config/passport')(passport);


app.use('/api/users/',users)
app.use('/api/profiles/',profiles)
app.use('/api/post/',post)

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
})